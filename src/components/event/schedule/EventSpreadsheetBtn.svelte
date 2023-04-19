<script lang="ts">
  import type { JobSignUpCollection, Shift } from '$types';
  import { Job } from '$models';
  import { VEvent } from '$models';
  import { shortTime, formatDate } from '$util';

  export let selectedEvent: VEvent;
  export let signUps: JobSignUpCollection;

  // Create a row of volunteer data for the CSV content
  function createVolunteerRow(shift: Shift, shiftSignUps) {
    return [
      `${shortTime(shift.from)}-${shortTime(shift.to)}`,
      `${shift.location ? '(' + shift.location + ')' : ''}`,
      ...(shiftSignUps ? shiftSignUps[shift.id] || [] : []).map(
        (signUp) => signUp.volunteerDisplayName
      ),
    ];
  }

  // Create all the rows related to a specific job for the CSV content
  function createJobRows(job: Job, signUps: JobSignUpCollection) {
    const jobModel = Job.from(job);
    const shifts = jobModel.sortedShifts;
    const shiftSignUps = signUps[job.id];

    const volunteers = shifts.map((shift) =>
      createVolunteerRow(shift, shiftSignUps)
    );

    return [[job.name], ...volunteers, ['']];
  }

  // Create the CSV content from the event and sign-ups data
  function createCsvContent(event: VEvent, signUps: JobSignUpCollection) {
    const jobs = Object.values(event.jobs);

    const rows = [
      [event.name],
      [event.location],
      [`${formatDate(event.date)}`],
      [''],

      ...jobs.reduce((acc, job) => {
        return [...acc, ...createJobRows(job, signUps)];
      }, [] as Array<string[]>),
    ];

    return rows.map((e) => e.join(',')).join('\n');
  }

  // Create a Blob containing the CSV content from the event and sign-ups data
  function createCsvBlob(event: VEvent, signUps: JobSignUpCollection) {
    const csvContent = createCsvContent(event, signUps);
    return new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
  }

  // Download the CSV file by creating a temporary link and simulating a click
  function downloadCsv(blob: Blob) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'event-data.csv';
    link.click();
    URL.revokeObjectURL(url);
  }

  // Generate and download the CSV file containing event and sign-ups data
  function generate() {
    const event = VEvent.from(selectedEvent);
    const csvBlob = createCsvBlob(event, signUps);
    downloadCsv(csvBlob);
  }
</script>

<button
  on:click={generate}
  class="text-indigo-700
         font-semibold
         opacity-70
         hover:opacity-100
         flex
         items-center"
>
  <span>
    <svg
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
    </svg>
    &nbsp;spreadsheet
  </span>
</button>
