<script lang="ts">
  import type { Answer, Question } from '$models';

  export let question: Question;
  export let answers: Answer[];

  // Generate and download the CSV file containing event and sign-ups data
  function generate() {
    const csvBlob = createCsvBlob();
    downloadCsv(csvBlob);
  }

  // Create a Blob containing the CSV content from the event and sign-ups data
  function createCsvBlob() {
    const csvContent = createCsvContent();
    return new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
  }

  // Create the CSV content from the event and sign-ups data
  function createCsvContent() {
    return [
      question.question,
      '---------------',
      ...answers.map((a) => [a.volunteerDisplayName, a.answer]),
    ].join('\n');
  }

  // Download the CSV file by creating a temporary link and simulating a click
  function downloadCsv(blob: Blob) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `answers-${question.id}-data.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }
</script>

<button
  on:click={generate}
  class="text-indigo-700
         font-semibold
         opacity-70
         hover:opacity-100
         flex
         flex-col
         items-end"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="h-8 w-8"
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
  <span class="text-xs block">spreadsheet</span>
</button>
