<template>
  <v-footer
    id="core-footer"
    absolute
    height="82">
    <v-spacer/>
    <span class="font-weight-light copyright">
      &copy;
      {{ (new Date()).getFullYear() }}
      Tasogare Team, made with
      <v-icon
        color="tertiary"
        size="17">mdi-heart</v-icon>
    </span>
  </v-footer>
</template>

<script>
export default {}
</script>

<style>
#core-footer {
  z-index: 0;
}
</style>
