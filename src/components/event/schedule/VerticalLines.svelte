<script lang="ts">
  export let numJobs: number;
</script>

<div
  class="variable-cols col-start-1 col-end-2 row-start-1 hidden grid-rows-1 divide-x divide-gray-100 sm:grid"
  style="--num-jobs: {numJobs}"
>
  <div class="col-start-1 row-span-full" />
  <div class="col-start-2 row-span-full" />
  <div class="col-start-3 row-span-full" />
  <div class="col-start-4 row-span-full" />
  <div class="col-start-5 row-span-full" />
  <div class="col-start-6 row-span-full" />
  <div class="col-start-7 row-span-full" />
  <div class="col-start-8 row-span-full w-8" />
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
