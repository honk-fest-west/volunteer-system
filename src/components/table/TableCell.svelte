<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  export let text = 'center';
  export let selectable = false;

  const dispatch = createEventDispatcher();

  function select() {
    dispatch('selected');
  }
</script>

<td
  on:click={select}
  class="whitespace-nowrap border-b border-gray-200 px-6 py-4 text-sm"
  class:cursor-pointer={selectable}
  class:text-center={text === 'center'}
  class:text-right={text === 'right'}
  class:text-left={text === 'left'}><slot /></td
>
