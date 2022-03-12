<script lang="ts">
  import MainRouter from '$routes/MainRouter.svelte';
  import { variables } from '$config/variables';
  import './app.css';
</script>

<svelte:head>
  {@html `<meta name="facebook-domain-verification" content="${variables.FACEBOOK_DOMAIN_VERIFICATION}" />`}
  <link
    href="https://fonts.googleapis.com/css2?family=Material+Icons"
    rel="stylesheet"
  />
</svelte:head>

<MainRouter />
