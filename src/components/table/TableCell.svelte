<script lang="ts">
  export let text = 'center';
</script>

<td
  class="whitespace-nowrap border-b border-gray-200 px-6 py-4 text-sm"
  class:text-center={text === 'center'}
  class:text-right={text === 'right'}
  class:text-left={text === 'left'}><slot /></td
>
