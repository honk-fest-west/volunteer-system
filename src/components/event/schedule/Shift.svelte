<script lang="ts">
  import type { Job, ShiftSignUp } from '$models';
  import ShiftContent from './ShiftContent.svelte';

  export let date: string;
  export let job: Job;
  export let col: number;
  export let shiftId: string;
  export let signUps: ShiftSignUp[];

  const shift = job.shifts[shiftId];
  const [fromHours, fromMinutes] = shift.from
    .split(':')
    .map((v) => parseInt(v));
  const [toHours, toMinutes] = shift.to.split(':').map((v) => parseInt(v));
  const rowStart = 2 + fromHours * 12 + Math.round(fromMinutes / 5);
  const rowEnd = 2 + toHours * 12 + Math.round(toMinutes / 5) - rowStart;
  const color = job.color;
  const time = shift.from;
</script>

<li
  class="shift relative mt-px flex"
  style="--col-num = {col}; grid-row: {rowStart} / span {rowEnd}"
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
