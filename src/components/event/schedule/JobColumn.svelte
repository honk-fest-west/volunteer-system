<script lang="ts">
  import type { Job, ShiftSignUp } from '$models';

  import FilledShifts from './FilledShifts.svelte';
  import OpenShifts from './OpenShifts.svelte';

  export let date: string;
  export let job: Job;
  export let col: number;
  export let startTime: number;
  export let jobSignUps: { [shiftId: string]: ShiftSignUp[] };
  export let mobileJob: number;
</script>

<FilledShifts
  {date}
  {job}
  {startTime}
  {col}
  {jobSignUps}
  {mobileJob}
  on:selectjob
/>
<OpenShifts
  {date}
  {job}
  {startTime}
  {col}
  {jobSignUps}
  {mobileJob}
  on:selectjob
/>
