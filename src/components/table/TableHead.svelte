<script lang="ts">
  export let side = 'middle';
  export let text = 'center';
</script>

<th
  scope="col"
  class="sticky shadow-sm top-[8.25rem] sm:top-[5.25rem] z-10 border-b border-t border-gray-300 bg-gray-50 bg-opacity-75 px-6 py-4 text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
  class:border-l={side === 'left'}
  class:border-r={side === 'right'}
  class:text-center={text === 'center'}
  class:text-right={text === 'right'}
  class:text-left={text === 'left'}><slot /></th
>
