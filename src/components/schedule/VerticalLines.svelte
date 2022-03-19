<script lang="ts">
  export let numJobs: number;

  const rowSpans = Array.from({ length: numJobs }, (v, i) => i + 1);
</script>

<div
  class="variable-cols col-start-1 col-end-2 row-start-1 hidden grid-rows-1 divide-x divide-gray-100 sm:grid"
  style="--num-jobs: {numJobs}"
>
  {#each rowSpans as rowSpan}
    <div class="row-span-full" style="grid-column-start: {rowSpan};" />
  {/each}
  <div class="row-span-full w-8" style="grid-column-start: {numJobs + 1};" />
</div>

<style>
  .variable-cols {
    grid-template-columns: repeat(var(--num-jobs), minmax(0, 1fr));
  }
  @media (min-width: 640px) {
    .variable-cols {
      grid-template-columns: repeat(var(--num-jobs), minmax(0, 1fr));
    }
  }
</style>
