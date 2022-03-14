<script>
  import EventBackButton from './BackButton.svelte';
  export let send;
  export let name;
</script>

<h1 class="text-3xl font-extrabold text-pink-700 grow">
  <EventBackButton {send} />
  <span class:hidden={!name}>{name}</span>
</h1>
