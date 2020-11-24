<style>
  .wrapper {
    margin-right: 10px;
    width: 100%;
  }

  .product-table__search {
    width: 100%;
    margin-bottom: 5px;
  }
</style>

<script lang="ts">
  import SvelteTable from "svelte-table";
  import dayjs from "dayjs";
  import AddToBasketButton from "./AddToBasketButton.svelte";

  export let services;
  export let eventHandler;

  let products = [];
  let searchText;

  $: filteredProducts = searchText
    ? products.filter(
        ({ name, desc }) =>
          name.toLowerCase().includes(searchText.toLowerCase()) ||
          desc.toLowerCase().includes(searchText.toLowerCase())
      )
    : products;

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
      title: "Release Date",
      value: (v) => dayjs(v.release).format("DD-MM-YYYY"),
      sortable: true,
    },
    {
      key: "actions",
      title: "",
      // TODO: This does not work because only plain html is allowed. What is a solution for this?
      renderComponent: AddToBasketButton,
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

<!--TODO: Implement add to basket button.-->
<main class="wrapper">
  {#if products?.length}
    <input
      class="product-table__search"
      placeholder="search products by name or description"
      bind:value={searchText} />
    <SvelteTable
      {columns}
      rows={filteredProducts}
      classNameTable="table table-dark" />
  {:else}loading...{/if}
</main>
