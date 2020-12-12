import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import {terser} from 'rollup-plugin-terser';
import sveltePreprocess from 'svelte-preprocess';
import typescript from '@rollup/plugin-typescript';
import html from '@rollup/plugin-html';
import copy from 'rollup-plugin-copy'

const packageJson = require('./package.json');
const production = !process.env.ROLLUP_WATCH;


const template = async ({ attributes, files, meta, publicPath, title }) => {
	const scripts = (files.js || [])
		.map(({ fileName }) => {
			const attrs = makeHtmlAttributes(attributes.script);
			return `<script src="${publicPath}${fileName}"${attrs}></script>`;
		})
		.join('\n');

	const links = (files.css || [])
		.map(({ fileName }) => {
			const attrs = makeHtmlAttributes(attributes.link);
			return `<link href="${publicPath}${fileName}" rel="stylesheet"${attrs}>`;
		})
		.join('\n');

	const metas = meta
		.map((input) => {
			const attrs = makeHtmlAttributes(input);
			return `<meta${attrs}>`;
		})
		.join('\n');

	const favicon = '<link rel="icon" type="image/x-icon" href="/favicon.png">'
	const globalCss = '<link href="global.css" rel="stylesheet">';
	const bootstrap = `<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" />`;

	return `
<!doctype html>
<html${makeHtmlAttributes(attributes.html)}>
  <head>
    ${metas}
    <title>${title}</title>
    ${links}
    ${globalCss}
    ${favicon}
    ${bootstrap}
  </head>
  <body>
    ${scripts}
  </body>
</html>`;
};

const makeHtmlAttributes = (attributes) => {
	if (!attributes) {
		return '';
	}

	const keys = Object.keys(attributes);
	// eslint-disable-next-line no-param-reassign
	return keys.reduce((result, key) => (result += ` ${key}="${attributes[key]}"`), '');
};

function serve() {
	let server;
	
	function toExit() {
		if (server) server.kill(0);
	}

	return {
		writeBundle() {
			if (server) return;
			server = require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
				stdio: ['ignore', 'inherit', 'inherit'],
				shell: true
			});

			process.on('SIGTERM', toExit);
			process.on('exit', toExit);
		}
	};
}

export default {
	input: ['src/main.ts'],
	output: {
		sourcemap: false,
		format: 'iife',
		dir: 'public/build',
		entryFileNames: `${packageJson.name}__${packageJson.version}.js`
	},
	plugins: [
		svelte({
			// enable run-time checks when not in production
			dev: !production,
			// we'll extract any component CSS out into
			// a separate file - better for performance
			css: css => {
				css.write(`${packageJson.name}__${packageJson.version}.css`);
			},
			preprocess: sveltePreprocess()
		}),
		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration -
		// consult the documentation for details:
		// https://github.com/rollup/plugins/tree/master/packages/commonjs
		resolve({
			browser: true,
			dedupe: ['svelte']
		}),
		commonjs(),
        html({template}),
		copy({
			targets: [
				{ src: "app-manifest.json", dest: "public/build", transform: contents => contents.toString().replace('__version__', packageJson.version) },
				{ src: "public/global.css", dest: "public/build" },
				{ src: "public/favicon.png", dest: "public/build" },
			]
		}),
		typescript({
			sourceMap: !production,
			inlineSources: !production
		}),

		// In dev mode, call `npm run start` once
		// the bundle has been generated
		!production && serve(),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		!production && livereload('public'),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser()
	],
	watch: {
		clearScreen: false
	}
};
