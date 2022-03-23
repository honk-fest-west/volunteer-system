<script lang="ts">
  import { VEvent } from '$models';
  import type { JobSignUpCollection } from '$types';
  import HorizontalLines from './HorizontalLines.svelte';
  import JobsXAxis from './JobsXAxis.svelte';
  import JobsXAxisMobile from './JobsXAxisMobile.svelte';
  import Jobs from './Jobs.svelte';
  import VerticalLines from './VerticalLines.svelte';

  export let selectedEvent: VEvent;
  export let signUps: JobSignUpCollection;
  export let allowPrevPage: boolean;
  export let allowNextPage: boolean;
  export let currentPage: number;

  $: event = VEvent.from(selectedEvent);
  $: jobs = event.sortedJobs(currentPage) || [];
  $: date = event.date;
  $: [startTime, endTime] = event.roundedTimeRange || [0, 0];
</script>

<div class="flex flex-auto flex-col  bg-white">
  <div
    style="width: 165%;"
    class="flex max-w-full flex-none flex-col sm:max-w-none md:max-w-full"
  >
    <div
      class="sticky top-[132px] sm:top-[83px] z-30 flex-none bg-white shadow ring-1 ring-black ring-opacity-5 "
    >
      <JobsXAxisMobile {jobs} />
      <JobsXAxis
        {jobs}
        {allowPrevPage}
        {allowNextPage}
        on:selectjob
        on:prevschedulepage
        on:nextschedulepage
      />
    </div>
    <div class="flex flex-auto overflow-x-hidden">
      <div
        class="sticky left-0 z-10 w-14 flex-none bg-white ring-1 ring-gray-100"
      />
      <div class="grid flex-auto grid-cols-1 grid-rows-1">
        <!-- Horizontal lines -->
        <HorizontalLines {startTime} {endTime} />

        <!-- Job Columns -->
        <Jobs {date} {jobs} {signUps} {startTime} {endTime} on:selectjob />

        <!-- Vertical lines -->
        <VerticalLines {jobs} on:selectjob />
      </div>
    </div>
  </div>
</div>
