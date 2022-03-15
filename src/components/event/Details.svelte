<script lang="ts">
  import type { VEvent } from '$types';

  export let selectedEvent: VEvent;
</script>

{#if selectedEvent}
  <section class="pt-4">
    <div class="flex justify-between">
      <div>
        <h3 class="text-xl font-medium text-gray-900">{selectedEvent.name}</h3>
        <time datetime={selectedEvent.date} class="text-gray-500 mt-2">
          {selectedEvent.date}
        </time>
      </div>
      {#if selectedEvent.locationUrl}
        <div class="ml-10">
          <a
            href={selectedEvent.locationUrl}
            target="_blank"
            rel="noopener"
            class="text-indigo-600 hover:text-indigo-500 cursor-pointer"
          >
            <svg
              class="fill-current "
              xmlns="http://www.w3.org/2000/svg"
              height="30px"
              viewBox="0 0 24 24"
              width="30px"
              fill="#000000"
              ><path d="M0 0h24v24H0z" fill="none" /><path
                d="M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z"
              /></svg
            >
            <p>map</p>
          </a>
        </div>
      {/if}
    </div>
    {#if selectedEvent.description}
      <p class="mt-2 text-sm text-gray-500">
        {selectedEvent.description}
      </p>
    {/if}
  </section>
{/if}
