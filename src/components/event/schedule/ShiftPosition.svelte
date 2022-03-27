<script lang="ts">
  export let col: number;
  export let startTime: number;
  export let from: number;
  export let to: number;
  export let mobileJob: number;

  const startDate = new Date(startTime);
  const fromDate = new Date(from);
  const toDate = new Date(to);

  const rowStart =
    2 +
    (fromDate.getHours() - startDate.getHours()) * 12 +
    Math.round(fromDate.getMinutes() / 5);
  const rowEnd =
    2 +
    (toDate.getHours() - startDate.getHours()) * 12 +
    Math.round(toDate.getMinutes() / 5) -
    rowStart;
</script>

{#if mobileJob === col - 1}
  <li
    class="shift relative mt-px flex"
    style="--col-num: {col}; grid-row: {rowStart} / span {rowEnd}"
  >
    <slot />
  </li>
{:else}
  <li
    class="shift relative mt-px hidden md:flex"
    style="--col-num: {col}; grid-row: {rowStart} / span {rowEnd}"
  >
    <slot />
  </li>
{/if}

<style>
  @media (min-width: 640px) {
    .shift {
      grid-column-start: var(--col-num);
    }
  }
</style>
