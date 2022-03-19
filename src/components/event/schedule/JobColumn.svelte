<script lang="ts">
  import type { Job, ShiftSignUp } from '$models';
  import Shift from './Shift.svelte';

  export let date: string;
  export let job: Job;
  export let col: number;
  export let jobSignUps: { [shiftId: string]: ShiftSignUp[] };

  const shiftSignUps = Object.entries(jobSignUps);
</script>

{#each shiftSignUps as signUps}
  <Shift {date} {job} {col} shiftId={signUps[0]} signUps={signUps[1]} />
{/each}
