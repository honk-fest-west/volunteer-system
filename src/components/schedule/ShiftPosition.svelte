<script lang="ts">
  export let col: number;
  export let startTime: number;
  export let from: number;
  export let to: number;

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

<li
  class="shift relative mt-px flex"
  style="--col-num: {col}; grid-row: {rowStart} / span {rowEnd}"
>
  <slot />
</li>

<style>
  @media (min-width: 640px) {
    .shift {
      grid-column-start: var(--col-num);
    }
  }
</style>
