<script lang="ts">
  import type { JobSignUpCollection } from '$types';
  import { createEventDispatcher } from 'svelte';
  import { ShiftSignUp, VEvent } from '$models';
  import HorizontalLines from './HorizontalLines.svelte';
  import JobsXAxis from './JobsXAxis.svelte';
  import JobsXAxisMobile from './JobsXAxisMobile.svelte';
  import Jobs from './Jobs.svelte';
  import VerticalLines from './VerticalLines.svelte';
  import { timeToInt } from '$util';

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

  function spreadsheet() {
    const event = VEvent.from(selectedEvent);
    const times = event.roundedTimeList();
    const timeDisplays = times.map((time) => {
      const date = new Date(time);
      return date
        .toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: 'numeric',
        })
        .replace(/\s/g, '');
    });
    const jobs = Object.values(event.jobs);

    const rows = [
      ['', ...timeDisplays],
      ...jobs.map((job) => {
        const shiftSignUps = Object.entries(signUps[job.id] || {});
        const mergedShiftSignUps = shiftSignUps.reduce(
          (acc, [shiftId, signUps]) => {
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
          },
          [] as Array<{ from: number; to: number; signUps: ShiftSignUp[] }>
        );

        const jobShifts = times.map((time, i) => {
          const shiftSignUp = mergedShiftSignUps.find(
            (signUp) => signUp.from === time
          );
          return shiftSignUp
            ? shiftSignUp.signUps
                .map((signUp) => signUp.volunteerDisplayName)
                .join('\n' + ','.repeat(i + 1))
            : '';
        });

        return [job.name, jobShifts];
      }),
    ];

    let csvContent =
      'data:text/csv;charset=utf-8,' + rows.map((e) => e.join(',')).join('\n');

    var encodedUri = encodeURI(csvContent);
    window.open(encodedUri);
  }
</script>

<div class="hidden sm:flex justify-end pt-5">
  <button
    on:click={spreadsheet}
    class="text-indigo-700 font-semibold 
    opacity-70 hover:opacity-100 flex items-center"
    ><svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      stroke-width="2"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
      />
    </svg> &nbsp;spreadsheet</button
  >
</div>

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
