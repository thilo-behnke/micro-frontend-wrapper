<script lang="ts">
	export let backends;
</script>

<main class="test">
	{#if backends.length}
       App has {backends.length} {backends.length > 1 ? 'backends' : 'backend'}:
        <ul>
			{#each backends as backend}
				<div>{backend.name}: {backend.serviceUrl}</div>
			{/each}
		</ul>
	{/if}
</main>

<style>
	.test {
		margin-right: 10px;
	}
</style>
