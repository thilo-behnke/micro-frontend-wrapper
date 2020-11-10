<style>
  .test {
    margin-right: 10px;
  }
</style>

<script lang="ts">
  export let backends;
</script>

<main class="test">
  {#if backends.length}
    App has
    {backends.length}
    {backends.length > 1 ? 'backends' : 'backend'}:

    <ul>
      {#each backends as backend}
        <div>{backend.serviceName}: {backend.serviceUrl}</div>
      {/each}
    </ul>
  {:else}App has not registered any backends.{/if}
</main>
