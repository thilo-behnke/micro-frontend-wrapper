<style>
  .test {
    margin-right: 10px;
  }
</style>

<script lang="ts">
  export let services;
</script>

<main class="test">
  {#if services.length}
    App has
    {services.length}
    {services.length > 1 ? 'backends' : 'backend'}:

    <ul>
      {#each services as service}
        <div>{service.serviceName}: {service.serviceUrl}</div>
      {/each}
    </ul>
  {:else}App has not registered any backends.{/if}
</main>
