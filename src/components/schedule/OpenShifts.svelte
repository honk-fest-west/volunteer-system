<script lang="ts">
  import type { Job, ShiftSignUp } from '$models';
  import { createEventDispatcher } from 'svelte';
  import ShiftPosition from './ShiftPosition.svelte';
  import { timeToInt } from '$util';
  import OpenShiftContent from './OpenShiftContent.svelte';

  export let date: string;
  export let job: Job;
  export let col: number;
  export let startTime: number;
  export let jobSignUps: { [shiftId: string]: ShiftSignUp[] };
  export let mobileJob: number;

  const dispatch = createEventDispatcher();
  const filledShiftIds = Object.keys(jobSignUps);

  const openShifts = Object.values(job.shifts).filter(
    (shift) => !filledShiftIds.includes(shift.id)
  );

  const color = job.color;

  function selectJob(shiftId) {
    dispatch('selectjob', { jobId: job.id, shiftIds: [shiftId] });
  }
</script>

{#each openShifts as shift}
  <ShiftPosition
    {col}
    {startTime}
    {mobileJob}
    from={timeToInt(shift.from)}
    to={timeToInt(shift.to)}
  >
    <OpenShiftContent
      {color}
      {date}
      jobName={job.name}
      from={timeToInt(shift.from)}
      on:click={() => selectJob(shift.id)}
    />
  </ShiftPosition>
{/each}
