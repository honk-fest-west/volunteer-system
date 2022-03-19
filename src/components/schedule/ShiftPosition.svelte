<script lang="ts">
  import type { Job, ShiftSignUp } from '$models';
  import ShiftContent from './ShiftContent.svelte';

  export let date: string;
  export let job: Job;
  export let col: number;
  export let from: number;
  export let to: number;
  export let signUps: ShiftSignUp[];

  const fromDate = new Date(from);
  const toDate = new Date(to);

  //const shift = job.shifts[shiftId];
  // const [fromHours, fromMinutes] = shift.from
  //   .split(':')
  //   .map((v) => parseInt(v));
  // const [toHours, toMinutes] = shift.to.split(':').map((v) => parseInt(v));
  const rowStart =
    2 + fromDate.getHours() * 12 + Math.round(fromDate.getMinutes() / 5);
  const rowEnd =
    2 + toDate.getHours() * 12 + Math.round(toDate.getMinutes() / 5) - rowStart;
  const color = job.color;
  const time = fromDate.toLocaleTimeString([], {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
  });
  // TODO: this assumes that all shifts in this glob have same start time
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
