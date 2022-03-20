<script>
  export let name;
</script>

<h1 class="text-3xl font-extrabold text-pink-700 grow">
  <slot name="left" />
  <span class:hidden={!name}>{name}</span>
</h1>
