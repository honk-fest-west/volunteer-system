<script lang="ts">
  import { hoursToMilliseconds } from '$util';

  import range from 'just-range';
  export let startTime: number;
  export let endTime: number;

  const times = range(startTime, endTime, hoursToMilliseconds()).map((time) => {
    const date = new Date(time);
    return date
      .toLocaleTimeString('en-US', {
        hour: 'numeric',
      })
      .replace(/\s/g, '');
  });

  const numRows = times.length * 2;
</script>

<div
  class="col-start-1 col-end-2 row-start-1 grid divide-y divide-gray-100"
  style="grid-template-rows: repeat({numRows}, minmax(3.5rem, 1fr))"
>
  <div class="row-end-1 h-7" />
  {#each times as time}
    <div>
      <div
        class="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400"
      >
        {time}
      </div>
    </div>
    <div />
  {/each}
</div>
