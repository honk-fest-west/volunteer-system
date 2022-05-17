<script lang="ts">
  import type { JobSignUpCollection } from '$types';
  import { Job } from '$models';
  import { VEvent } from '$models';
  import { shortTime } from '$util';

  export let selectedEvent: VEvent;
  export let signUps: JobSignUpCollection;

  function generate() {
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

    const rows = jobs.reduce((acc, job) => {
      const jobModel = Job.from(job);
      const shifts = jobModel.sortedShifts;
      const shiftSignUps = signUps[job.id];

      const volunteers = shifts.map((shift) => [
        `${shortTime(shift.from)}-${shortTime(shift.to)}`,
        `${shift.location ? '(' + shift.location + ')' : ''}`,
        ...(shiftSignUps ? shiftSignUps[shift.id] || [] : []).map(
          (signUp) => signUp.volunteerDisplayName
        ),
      ]);

      return [...acc, [job.name], ...volunteers, ['']];
    }, [] as Array<string[]>);

    let csvContent =
      'data:text/csv;charset=utf-8,' + rows.map((e) => e.join(',')).join('\n');

    var encodedUri = encodeURI(csvContent);
    window.open(encodedUri);
  }
</script>

<button
  on:click={generate}
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
