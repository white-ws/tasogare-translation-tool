const axios = require('axios')

export class GoogleCloud {
    url = 'https://translation.googleapis.com/language/translate/v2';
    key = '';
    words = null;
    vietnamese = [];
    english = [];
    chinese = [];
    englishToVn = [];
    chineseToVn = [];

    constructor(key, words) {
        this.words = words
        this.key = key;
    }

    async trans() {
        this.vietnamese = await this.translate(this.words, 'ja', 'vi')
        this.english = await this.translate(this.words, 'ja', 'en')
        this.chinese = await this.translate(this.words, 'ja', 'zh-TW')
        this.englishToVn = await this.translate(this.english, 'en', 'vi')
        this.chineseToVn = await this.translate(this.chinese, 'zh-TW', 'vi')
    }

    async translate(words, source, target) {
        if (!words) return;
        let formDataList = [];
        let formData = null;
        let translated = [];
        words.forEach((word, index) => {
            if (!formData) {
                formData = new FormData();
                formData.set('key', this.key);
                formData.set('source', source);
                formData.set('target', target);
            }
            formData.append('q', word);

            if ((index + 1) % 100 == 0 || index == words.length - 1) {
                formDataList.push(formData);
                formData = null;
            }
        })

        for (let index in formDataList) {
            let res = await axios({
                method: 'post',
                url: this.url,
                data: formDataList[index]
            })
            translated.push(...this.formatResponse(res.data));
        }

        return translated;
    }

    formatResponse(data) {
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
