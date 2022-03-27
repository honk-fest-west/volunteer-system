<script lang="ts">
  import type { Job, ShiftSignUp } from '$models';
  import { createEventDispatcher } from 'svelte';
  import ShiftPosition from './ShiftPosition.svelte';
  import { timeToInt } from '$util';
  import FilledShiftContent from './FilledShiftContent.svelte';

  export let date: string;
  export let job: Job;
  export let col: number;
  export let startTime: number;
  export let jobSignUps: { [shiftId: string]: ShiftSignUp[] };
  export let mobileJob: number;

  const color = job.color;
  const shiftSignUps = Object.entries(jobSignUps);
  const dispatch = createEventDispatcher();

  // Merged ShiftSignUps
  //
  const mergedShiftSignUps = shiftSignUps.reduce((acc, [shiftId, signUps]) => {
    const shift = job.shifts[shiftId];
    const from = timeToInt(shift.from);
    const to = timeToInt(shift.to);

    const newGlobIndex = acc.findIndex((glob) => {
      return glob.from <= from && glob.to >= to;
    });

    if (newGlobIndex > -1) {
      const newGlob = acc[newGlobIndex];
      newGlob.from = Math.min(newGlob.from, from);
      newGlob.to = Math.max(newGlob.to, to);
      newGlob.signUps = [...newGlob.signUps, ...signUps];
      acc[newGlobIndex] = newGlob;
    } else {
      acc.push({
        from,
        to,
        signUps,
      });
    }
    return acc;
  }, [] as Array<{ from: number; to: number; signUps: ShiftSignUp[] }>);

  function selectJob(signUps) {
    const shiftIds = signUps.map((signUp) => signUp.shiftId);
    dispatch('selectjob', { jobId: job.id, shiftIds });
  }
</script>

{#each mergedShiftSignUps as shiftSignUps}
  <ShiftPosition
    {col}
    {startTime}
    {mobileJob}
    from={shiftSignUps.from}
    to={shiftSignUps.to}
  >
    <FilledShiftContent
      {color}
      {date}
      jobName={job.name}
      from={shiftSignUps.from}
      signUps={shiftSignUps.signUps}
      on:click={() => selectJob(shiftSignUps.signUps)}
    />
  </ShiftPosition>
{/each}
