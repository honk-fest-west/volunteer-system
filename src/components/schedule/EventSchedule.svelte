<script lang="ts">
  import type { VEvent } from '$models';
  import type { JobSignUpCollection } from '$types';
  import HorizontalLines from './HorizontalLines.svelte';
  import JobsXAxis from './JobsXAxis.svelte';
  import JobsXAxisMobile from './JobsXAxisMobile.svelte';
  import Jobs from './Jobs.svelte';
  import VerticalLines from './VerticalLines.svelte';

  export let selectedEvent: VEvent;
  export let signUps: JobSignUpCollection;

  $: jobs = selectedEvent?.sortedJobs || [];
  $: date = selectedEvent?.date;
  $: [startTime, endTime] = selectedEvent?.roundedTimeRange || [0, 0];
</script>

<div class="flex h-full flex-col">
  <div class="flex flex-auto flex-col overflow-auto bg-white">
    <div
      style="width: 165%"
      class="flex max-w-full flex-none flex-col sm:max-w-none md:max-w-full"
    >
      <div
        class="sticky top-0  z-20 flex-none bg-white shadow ring-1 ring-black ring-opacity-5 sm:pr-8"
      >
        <JobsXAxisMobile {jobs} />
        <JobsXAxis {jobs} />
      </div>
      <div class="flex flex-auto">
        <div
          class="sticky left-0 z-10 w-14 flex-none bg-white ring-1 ring-gray-100"
        />
        <div class="grid flex-auto grid-cols-1 grid-rows-1">
          <!-- Horizontal lines -->
          <HorizontalLines {startTime} {endTime} />

          <!-- Vertical lines -->
          <VerticalLines numJobs={jobs.length} />

          <!-- Shifts -->
          <Jobs {date} {jobs} {signUps} {startTime} {endTime} />
        </div>
      </div>
    </div>
  </div>
</div>
