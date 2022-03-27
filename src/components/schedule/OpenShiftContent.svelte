<script lang="ts">
  import { shortTime } from '$util';

  export let jobName: string;
  export let color: string;
  export let date: string;
  export let from: number;

  const time = new Date(from).toLocaleTimeString([], {
    // TODO: this assumes that all shifts in this glob have same start time
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
  });
</script>

<button
  on:click
  class="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg p-2 text-xs leading-5 opacity-80 hover:opacity-100 border-2 border-dashed hover:bg-opacity-10 hover:bg-indigo-200"
  style="border-color: {color};"
>
  <div class="opacity-50 group-hover:opacity-70 flex justify-between w-full">
    <time datetime="{date}T{time}">{shortTime(time)}</time>
    <p class="underline">{jobName}</p>
  </div>
</button>
