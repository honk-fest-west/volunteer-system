<script lang="ts">
  import Actions from '$components/event/Actions.svelte';
  import type { Job, ShiftSignUp } from '$models';
  import ShiftPosition from './ShiftPosition.svelte';

  export let date: string;
  export let job: Job;
  export let col: number;
  export let jobSignUps: { [shiftId: string]: ShiftSignUp[] };

  const shiftSignUps = Object.entries(jobSignUps);
  const mergedShiftSignUps = shiftSignUps.reduce((acc, [shiftId, signUps]) => {
    const shift = job.shifts[shiftId];
    const from = Date.parse('0001-01-01T' + shift.from);
    const to = Date.parse('0001-01-01T' + shift.to);

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
</script>

{#each mergedShiftSignUps as shiftSignUps}
  <ShiftPosition {date} {job} {col} {...shiftSignUps} />
{/each}
