<script lang="ts">
  import { getContext } from 'svelte';
  import Details from '$components/event/Details.svelte';
  import MyShifts from '$components/my/schedule/MyShifts.svelte';
  const { state, send } = getContext('scheduleMachine');

  $: events = $state.context.schedule;
</script>

<div class="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6">
  {#each events as event}
    <div class="rounded-lg shadow-md overflow-hidden ">
      <div class="px-6 pb-4  border border-gray-200 ">
        <Details {...event} />
      </div>
      <div class="px-6 py-4 border border-t-0  bg-gray-50 border-gray-200">
        <MyShifts {event} />
      </div>
    </div>
  {/each}
</div>
