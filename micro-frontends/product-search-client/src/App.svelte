<style>
  .wrapper {
    margin-right: 10px;
    width: 100%;
  }
</style>

<script lang="ts">
  import SvelteTable from "svelte-table";

  export let services;

  let products;

  const columns = [
    { key: "name", title: "Product Name", value: (v) => v.name },
  ];

  const productSearchServiceUrl = services.find(
    ({ serviceName }) => serviceName === "product-search-api"
  )?.serviceUrl;
  if (!productSearchServiceUrl) {
    throw new Error("Cant find any registered service for product search api.");
  }
  fetch(productSearchServiceUrl + "/api/products")
    .then((res) => res.json())
    .then((resProducts) => (products = resProducts));
</script>

<link
  rel="stylesheet"
  href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" />
<main class="wrapper">
  {#if products?.length}
    <SvelteTable {columns} rows={products} classNameTable="table table-dark" />
  {:else}App has not registered any backends.{/if}
</main>
