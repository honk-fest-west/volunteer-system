<script lang="ts">
  import type { VEvent } from '$models';

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
    </div>
    {#if selectedEvent.description}
      <p class="mt-2 text-sm text-gray-500">
        {selectedEvent.description}
      </p>
    {/if}
  </section>
{/if}
