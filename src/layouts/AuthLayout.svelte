<script lang="ts">
  import { fade } from 'svelte/transition';
  import { link } from 'svelte-spa-router';
  import Spinner from '$components/Spinner.svelte';

  export let error;
</script>

<div class="min-h-full flex  overflow-hidden">
  <div
    class="flex-1 grid grid-cols-1 grid-rows-5 py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24 bg-white"
  >
    <div
      class="row-span-4 flex flex-col justify-center mx-auto w-full max-w-sm lg:w-96"
    >
      <slot />
    </div>

    <div class="flex flex-col justify-between">
      <!-- show auth errors -->
      <div>
        {#if error}
          <div class="bg-red-200 text-red-700 p-3 mb-6" transition:fade>
            {error}
          </div>
        {/if}
      </div>
      <p
        class="w-full text-sm text-center border-t border-gray-300 pt-5 px-4 sm:px-6"
      >
        <a
          href="/info/privacy-policy"
          class=" text-sm text-indigo-600 hover:text-indigo-500"
          use:link
        >
          Privacy Policy
        </a>
      </p>
    </div>
  </div>

  <div class="hidden lg:block relative w-0 flex-1">
    <img
      class="absolute inset-0 h-full w-full object-cover"
      src="https://ik.imagekit.io/thegoldendino/hfw/carousel/tr:w-800/004_lkOtjeChIH80.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1628178217931"
      alt="HONK! Fest West at Gas Works Park"
    />
  </div>
</div>
<Spinner />
