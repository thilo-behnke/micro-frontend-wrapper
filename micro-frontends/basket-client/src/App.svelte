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
    import type {EventHandler,} from "./model/micro-frontend";
    import {EventType} from "./model/micro-frontend";
    import type {Basket} from "./model/basket";

    export let services;
  export let eventHandler: EventHandler;

  let basket: Basket;

  const basketServiceUrl = services.find(
    ({ serviceId }) => serviceId === "basket-api"
  )?.serviceUrl;
  if (!basketServiceUrl) {
    throw new Error("Cant find any registered service for product search api.");
  }
  fetch(basketServiceUrl + "/api/basket")
    .then((res) => res.json())
    .then((resBasket) => (basket = resBasket));

  eventHandler
    .receive(EventType.INCREMENT_BASKET_COUNT, EventType.DECREMENT_BASKET_COUNT)
    .subscribe(console.log);
</script>

<main class="wrapper">
  {#if basket}
    <ul>
    {#each basket.items as item}
        <li>{item.product.name}</li>
    {/each}
    </ul>
  {:else}loading...{/if}
</main>
