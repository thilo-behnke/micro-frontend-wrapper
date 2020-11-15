<style>
  .wrapper {
    margin-right: 10px;
    width: 100%;
  }
</style>

<script lang="ts">
  import SvelteTable from "svelte-table";
  import dayjs from "dayjs";

  export let services;

  let products;

  const columns = [
    {
      key: "name",
      title: "Product Name",
      value: (v) => v.name,
      sortable: true,
    },
    {
      key: "desc",
      title: "Description",
      value: (v) => (v.desc.length < 40 ? v.desc : v.desc.slice(0, 40) + "..."),
    },
    {
      key: "price",
      title: "Price in $",
      value: (v) => v.price,
      sortable: true,
    },
    {
      key: "release",
      title: "Price in $",
      value: (v) => dayjs(v.release).format("DD-MM-YYYY"),
      sortable: true,
    },
    {
      key: "actions",
      title: "",
      renderValue: () =>
        '<button class="btn btn-primary">Add to basket</button>',
    },
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

<!--TODO: Add search.-->
<!--TODO: Implement add to basket button.-->
<main class="wrapper">
  {#if products?.length}
    <SvelteTable {columns} rows={products} classNameTable="table table-dark" />
  {:else}App has not registered any backends.{/if}
</main>
