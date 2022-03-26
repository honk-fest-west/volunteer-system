<script lang="ts">
  export let side = 'middle';
</script>

<th
  scope="col"
  class="sticky shadow-sm top-[8rem] sm:top-[5rem] z-10 border-b border-t border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter "
  class:border-l={side === 'left'}
  class:rounded-tl-lg={side === 'left'}
  class:rounded-tr-lg={side === 'right'}
  class:border-r={side === 'right'}><slot /></th
>
