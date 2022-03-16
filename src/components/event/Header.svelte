<script>
  import EventBackButton from './BackButton.svelte';
  export let name;
</script>

<h1 class="text-3xl font-extrabold text-pink-700 grow">
  <EventBackButton on:goBack />
  <span class:hidden={!name}>{name}</span>
</h1>
