<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout wrap>
      <v-flex>
        <material-card
          color="green"
          title="Upload File"
          text="Upload japanese csv file to begin translate"
        >
          <div class="upload-form">
            <v-btn color="success" @click="$refs.inputUpload.click()" type="file">Upload</v-btn>
            <input v-show="false" ref="inputUpload" type="file" @change="onFileInput">
          </div>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    onFileInput(event) {
      const filePath = event.target.value;
      console.log(filePath);
    }
  }
};
</script>

<style lang="scss">
.upload-form {
  text-align: center;
  width: 100%;
}
</style>
