<script lang="ts">
  import type { JobSignUpCollection } from '$types';
  import { createEventDispatcher } from 'svelte';
  import { VEvent } from '$models';
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

  const dispatch = createEventDispatcher();

  let mobileJob = 0;
  let touchstartX = 0;
  let touchstartY = 0;
  let touchendX = 0;
  let touchendY = 0;

  function handleGesture(touchstartX, touchstartY, touchendX, touchendY) {
    const delx = touchendX - touchstartX;
    const dely = touchendY - touchstartY;
    if (Math.abs(delx) > Math.abs(dely)) {
      if (delx > 0) return 'right';
      else return 'left';
    } else if (Math.abs(delx) < Math.abs(dely)) {
      if (dely > 0) return 'down';
      else return 'up';
    } else return 'tap';
  }

  function handleTouchStart(event: TouchEvent) {
    touchstartX = event.touches[0].clientX;
    touchstartY = event.touches[0].clientY;
  }

  function handleTouchEnd(event: TouchEvent) {
    touchendX = event.changedTouches[0].clientX;
    touchendY = event.changedTouches[0].clientY;
    const direction = handleGesture(
      touchstartX,
      touchstartY,
      touchendX,
      touchendY
    );
    console.log('direction', direction);
    if (direction === 'left' && mobileJob < jobs.length - 1) {
      mobileJob = mobileJob + 1;
    } else if (direction === 'left' && allowNextPage) {
      dispatch('nextschedulepage');
    } else if (direction === 'right' && mobileJob > 0) {
      mobileJob = mobileJob - 1;
    } else if (direction === 'right' && allowPrevPage) {
      dispatch('prevschedulepage');
    }
  }
</script>

<div
  class="flex flex-auto flex-col  bg-white"
  on:touchstart={handleTouchStart}
  on:touchend={handleTouchEnd}
>
  <div
    style="width: 165%;"
    class="flex max-w-full flex-none flex-col sm:max-w-none md:max-w-full"
  >
    <div
      class="sticky top-[8rem] sm:top-[5rem] z-30 flex-none bg-white shadow ring-1 ring-black ring-opacity-5 "
    >
      <JobsXAxisMobile
        {jobs}
        {allowPrevPage}
        {allowNextPage}
        bind:mobileJob
        on:prevschedulepage
        on:nextschedulepage
      />
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
        <Jobs
          {date}
          {jobs}
          {signUps}
          {startTime}
          {endTime}
          {mobileJob}
          on:selectjob
        />

        <!-- Vertical lines -->
        <VerticalLines {jobs} on:selectjob />
      </div>
    </div>
  </div>
</div>
