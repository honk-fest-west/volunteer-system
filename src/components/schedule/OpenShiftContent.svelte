<script lang="ts">
  import { shortTime } from '$util';

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
  class="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg p-2 text-xs leading-5 opacity-80 hover:opacity-100 border-2 border-dashed"
  style="border-color: {color};"
>
  <p class="opacity-50 group-hover:opacity-70">
    <time datetime="{date}T{time}">{shortTime(time)}</time>
  </p>
</button>
