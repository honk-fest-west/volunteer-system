<script lang="ts">
  import type { VEvent } from '$models';

  export let name: string = '';
  export let date: string = '';
  export let description: string = null;
</script>

<section class="pt-4">
  <div class="flex justify-between">
    <div>
      <h3 class="text-xl font-medium text-gray-900">{name}</h3>
      <time datetime={date} class="text-gray-500 mt-2">
        {date}
      </time>
    </div>
  </div>
  {#if description}
    <p class="mt-2 text-sm text-gray-500">
      {description}
    </p>
  {/if}
</section>
