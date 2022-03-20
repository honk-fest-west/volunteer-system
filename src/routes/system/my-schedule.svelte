<script lang="ts">
  import { fade } from 'svelte/transition';
  import MainContainer from '$components/MainContainer.svelte';
  import Header from '$components/header/Header.svelte';
</script>

<div in:fade={{ duration: 100 }}>
  <MainContainer>
    <div slot="header">
      <Header name="My Schedule" />
    </div>
    <div class="bg-white space-y-6 divide-y divide-gray-200" />
  </MainContainer>
</div>
