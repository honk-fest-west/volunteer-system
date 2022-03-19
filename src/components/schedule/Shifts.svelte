<script lang="ts">
  import type { Job, ShiftSignUp } from '$models';
  import ShiftPosition from './ShiftPosition.svelte';

  export let date: string;
  export let job: Job;
  export let col: number;
  export let jobSignUps: { [shiftId: string]: ShiftSignUp[] };

  const shiftSignUps = Object.entries(jobSignUps);
</script>

{#each shiftSignUps as signUps}
  <ShiftPosition {date} {job} {col} shiftId={signUps[0]} signUps={signUps[1]} />
{/each}
