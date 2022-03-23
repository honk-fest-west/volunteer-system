<script lang="ts">
  import type { ShiftSignUp } from '$models';
  import { shortTime } from '$util';

  export let color: string;
  export let date: string;
  export let from: number;
  export let signUps: ShiftSignUp[];

  const time = new Date(from).toLocaleTimeString([], {
    // TODO: this assumes that all shifts in this glob have same start time
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
  });
</script>

<button
  on:click
  class="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg p-2 text-xs leading-5 opacity-80 hover:opacity-100"
  style="background-color: {color};"
>
  {#each signUps as signUp}
    <p class="order-1 font-semibold text-white opacity-70">
      {signUp.volunteerDisplayName}
    </p>
  {/each}

  <p class="text-white opacity-50 group-hover:opacity-70">
    <time datetime="{date}T{time}">{shortTime(time)}</time>
  </p>
</button>
