const axios = require('axios')

export class GoogleCloud {
    url = 'https://translation.googleapis.com/language/translate/v2';

    words = null;
    vietnamese = [];
    english = [];
    chinese = [];
    englishToVn = [];
    chineseToVn = [];

    constructor (key, words) {
      this.words = words
      this.url += '?key=' + key
    }

    async trans () {
      this.vietnamese = await this.translate(this.words, 'ja', 'vi')
      this.english = await this.translate(this.words, 'ja', 'en')
      this.chinese = await this.translate(this.words, 'ja', 'zh-TW')
      this.englishToVn = await this.translate(this.english, 'en', 'vi')
      this.chineseToVn = await this.translate(this.chinese, 'zh-TW', 'vi')
    }

    async translate (words, source, target) {
      let url = this.url
      words.forEach((word) => {
        url += '&q=' + word
      })
      url += '&source=' + source
      url += '&target=' + target

      let res = await axios.get(url)
      return this.formatResponse(res.data)
    }

    formatResponse (data) {
      let translated = []
      if (data && data.data && data.data.translations) {
        let translations = data.data.translations
        translations.forEach((item) => {
          translated.push(item.translatedText)
        })
      }
      return translated
    }
}
