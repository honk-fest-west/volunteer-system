<script lang="ts">
  import type { ShiftSignUp } from '$models';

  export let color: string;
  export let date: string;
  export let time: string;
  export let signUps: ShiftSignUp[];
</script>

<a
  href="#"
  class="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg p-2 text-xs leading-5 opacity-80 hover:opacity-100"
  style="background-color: {color};"
>
  {#each signUps as signUp}
    <p class="order-1 font-semibold text-white opacity-70">
      {signUp.volunteerDisplayName}
    </p>
  {/each}

  <p class="text-white opacity-50 group-hover:opacity-70">
    <time datetime="{date}T{time}">{time}</time>
  </p>
</a>
