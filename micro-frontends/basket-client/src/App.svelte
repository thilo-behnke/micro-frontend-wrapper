<style>
  .wrapper {
    margin-right: 10px;
    width: 100%;
    display: flex;
    flex-flow: column;
  }

  .product-table__search {
    width: 100%;
    margin-bottom: 10px;
  }
</style>

<script lang="ts">
  import SvelteTable from "svelte-table";
  import dayjs from "dayjs";
  import BasketActions from "./BasketActions.svelte";
  import type { Product } from "./model/product";
  import type {
    EventHandler,
    IncrementBasketCount,
  } from "./model/micro-frontend";
  import { EventType } from "./model/micro-frontend";

  export let services;
  export let eventHandler: EventHandler;

  const onIncrementBasket = (product: Product) => {
    eventHandler.send<Product>({
      type: EventType.INCREMENT_BASKET_COUNT,
      payload: product,
    });
  };

  const onDecrementBasket = (product: Product) => {
    eventHandler.send<Product>({
      type: EventType.DECREMENT_BASKET_COUNT,
      payload: product,
    });
  };

  let products: Product[] = [];
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
      renderComponent: {
        component: BasketActions,
        props: {
          onIncrementBasket,
          onDecrementBasket,
        },
      },
    },
  ];

  const productSearchServiceUrl = services.find(
    ({ serviceId }) => serviceId === "product-search-api"
  )?.serviceUrl;
  if (!productSearchServiceUrl) {
    throw new Error("Cant find any registered service for product search api.");
  }
  fetch(productSearchServiceUrl + "/api/products")
    .then((res) => res.json())
    .then((resProducts) => (products = resProducts));

  eventHandler
    .receive(EventType.INCREMENT_BASKET_COUNT, EventType.DECREMENT_BASKET_COUNT)
    .subscribe(console.log);
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
