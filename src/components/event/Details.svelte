<script lang="ts">
  import type { VEvent } from '$models';

  export let name: string = '';
  export let location: string = '';
  export let date: string = '';
  export let description: string = null;
</script>

<section class="pt-4">
  <div>
    <h3 class="text-xl font-medium text-gray-900">{name}</h3>
    <div class="text-gray-600">{location}</div>
    <time datetime={date} class="text-gray-600 mt-2">
      {date}
    </time>
  </div>
  {#if description}
    <p class="mt-4 text-sm text-gray-600">
      {description}
    </p>
  {/if}
</section>
