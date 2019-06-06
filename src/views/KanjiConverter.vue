<template>
  <v-container
    fill-height
    fluid
    grid-list-xl>
    <v-layout wrap>
      <v-flex>
        <material-card
          color="green"
          title="Upload File"
          text="Upload kanji csv file to begin convert"
        >
          <div class="upload-form">
            <v-btn
              v-if="!loading.status"
              color="success"
              type="file"
              @click="$refs.inputUpload.click()"
            >Upload</v-btn>
            <input
              v-show="false"
              ref="inputUpload"
              type="file"
              @change="onFileInput">
            <v-progress-circular
              v-if="loading.status"
              :width="3"
              color="green"
              indeterminate/>
          </div>

          <v-data-table
            v-if="doShowResult"
            :headers="headers"
            :items="items"
            hide-actions>
            <template
              slot="headerCell"
              slot-scope="{ header }">
              <span
                class="subheading font-weight-light text-success text--darken-3"
                v-text="header.text"
              />
            </template>
            <template
              slot="items"
              slot-scope="{ item }">
              <td>{{ item.origin }}</td>
              <td>{{ item.hira }}</td>
            </template>
          </v-data-table>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
const io = require('../utils/io')
const converter = require('../utils/converter')

export default {
  data () {
    return {
      headers: [
        {
          text: 'Input',
          value: 'origin'
        },
        {
          text: 'Hira',
          value: 'hira'
        }
      ],
      items: [],
      loading: {
        status: false
      }
    }
  },
  computed: {
    doShowResult () {
      return this.items && this.items.length > 0
    }
  },
  methods: {
    onFileInput (event) {
      this.loading.status = true

      const reader = new io.Reader(event.target.files[0], () => {
        let self = this
        let words = []

        while (reader.hasNext()) {
          words.push(reader.next())
        }

        this.onProcessInput(words)
          .then(() => {
            let writer = new io.Writer()
            writer.save(self.items)
            this.$toastr.success('Done!')
          })
          .catch((res) => {
            this.$toastr.error('Oops! Something unexpected happened!')
          })
          .then(() => {
            this.loading.status = false
          })
      })
    },
    async onProcessInput (words) {
      let japanese = new converter.Japanese()
      await japanese.toHiragara(words)

      words.forEach((word, index) => {
        this.items.push({
          origin: word,
          hira: japanese.hiraganaWords[word]
        })
      })
    }
  }
}
</script>

<style lang="scss">
.upload-form {
  text-align: center;
  width: 100%;
}
</style>
