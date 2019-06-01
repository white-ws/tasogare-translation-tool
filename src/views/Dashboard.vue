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
          text="Upload japanese csv file to begin translate"
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
              <td>{{ item.vietnam }}</td>
              <td>{{ item.englishToVn }}</td>
              <td>{{ item.chineseToVn }}</td>
            </template>
          </v-data-table>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
const io = require('../utils/io')
const api = require('../utils/api')

export default {
  data () {
    return {
      headers: [
        {
          text: 'Input',
          value: 'origin'
        },
        {
          text: 'Vietnamese',
          value: 'vietnam'
        },
        {
          text: 'English-Vietnamese',
          value: 'englishToVn'
        },
        {
          text: 'Chinese-Vietnamese',
          value: 'chineseToVn'
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
      const key = process.env.VUE_APP_KEY
      let items = []

      const reader = new io.Reader(event.target.files[0], () => {
        while (reader.hasNext()) {
          var word = reader.next()
          items.push(word)
        }

        let cloudApi = new api.GoogleCloud(key, items)
        let self = this
        cloudApi
          .trans()
          .then(res => {
            cloudApi.words.forEach((item, index) => {
              self.items.push({
                origin: cloudApi.words[index],
                vietnam: cloudApi.vietnamese[index],
                english: cloudApi.english[index],
                englishToVn: cloudApi.englishToVn[index],
                chinese: cloudApi.chinese[index],
                chineseToVn: cloudApi.chineseToVn[index]
              })
            })

            this.items = self.items
            let writer = new io.Writer()
            writer.save(self.items)
            this.$toastr.success('Done!')
          })
          .catch(() => {
            this.$toastr.error('Oops! Something unexpected happened!')
          })
          .then(() => {
            this.loading.status = false
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
