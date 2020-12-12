<style>
  .button-group {
    display: flex;
  }

  .button-group > * + * {
    margin-right: 1em;
  }
</style>

<script lang="ts">
  // import {Product} from "./model/product";

  export let row;
  export let col;
  export let onIncrementBasket;
  export let onDecrementBasket;
</script>

<div>
  <button
    class="btn btn-primary"
    on:click={() => onIncrementBasket(row)}>+</button>
  <button
    class="btn btn-primary"
    on:click={() => onDecrementBasket(row)}>-</button>
</div>
