<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
  function goBack() {
    dispatch('goBack');
  }
</script>

<button
  type="button"
  on:click={goBack}
  class="mr-2 inline-flex items-center border border-opacity-20 shadow-md  text-sm font-medium rounded-full text-indigo-500 hover:text-indigo-700  outline-none border-gray-800 focus:border-indigo-400"
>
  <span class="material-icons"> arrow_back </span>
</button>
