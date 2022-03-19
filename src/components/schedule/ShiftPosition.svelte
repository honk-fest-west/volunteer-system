<script lang="ts">
  import type { Job, ShiftSignUp } from '$models';
  import ShiftContent from './ShiftContent.svelte';

  export let date: string;
  export let job: Job;
  export let col: number;
  export let from: number;
  export let to: number;
  export let signUps: ShiftSignUp[];
  export let startTime: number;

  const startDate = new Date(startTime);
  const fromDate = new Date(from);
  const toDate = new Date(to);

  // is 194 should be 74

  const rowStart =
    2 +
    (fromDate.getHours() - startDate.getHours()) * 12 +
    Math.round(fromDate.getMinutes() / 5);
  const rowEnd =
    2 +
    (toDate.getHours() - startDate.getHours()) * 12 +
    Math.round(toDate.getMinutes() / 5) -
    rowStart;
  const color = job.color;
  const time = fromDate.toLocaleTimeString([], {
    // TODO: this assumes that all shifts in this glob have same start time
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
  });
</script>

<li
  class="shift relative mt-px flex"
  style="--col-num: {col}; grid-row: {rowStart} / span {rowEnd}"
>
  <ShiftContent {...{ color, date, time, signUps }} />
</li>

<style>
  @media (min-width: 640px) {
    .shift {
      grid-column-start: var(--col-num);
    }
  }
</style>
