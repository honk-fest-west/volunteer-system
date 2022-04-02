<script lang="ts">
  import unique from 'just-unique';
  import { fade } from 'svelte/transition';
  export let emailAddresses: string[] = [];

  const volunteerEmail = 'volunteer@honkfestwest.org';
</script>

<a
  class="bg-pink-500 hover:bg-pink-700 text-white font-semibold py-2 px-4 rounded flex"
  href="mailto:{volunteerEmail}?bcc={unique(emailAddresses).join(',')}"
  transition:fade={{ duration: 100 }}
>
  <div class="mr-2">
    <svg
      role="img"
      aria-labelledby="email"
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      stroke-width="2"
    >
      <title id="email">Email</title>
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  </div>
  <span class="block"><slot /></span>
</a>

<!-- <button
class="bg-pink-500 hover:bg-pink-700 text-white font-semibold py-2 px-4 rounded flex"
on:click={() => send('AT.CREATE')}
>
<div class="mr-2">
	<svg
		role="img"
		aria-labelledby="email"
		xmlns="http://www.w3.org/2000/svg"
		class="h-6 w-6"
		fill="none"
		viewBox="0 0 24 24"
		stroke="currentColor"
		stroke-width="2"
	>
		<title id="email">Email</title>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
		/>
	</svg>
</div>
<span class="block">Selected</span>
</button> -->
