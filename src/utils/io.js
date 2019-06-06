
export class Reader {
  words = []
  pointer = 0

  constructor (file, onLoaded) {
    var fileReader = new FileReader()
    fileReader.onload = (loadedEvent) => {
      var text = loadedEvent.target.result
      this.words = text.split('\n')

      onLoaded()
    }
    fileReader.readAsText(file, 'UTF-8')
  }

  hasNext () {
    return this.pointer < this.words.length
  }

  next () {
    if (this.hasNext()) {
      var value = this.words[this.pointer]
      this.pointer++
      return value.trim()
    }

    return null
  }
}

export class Writer {
  save (items) {
    var content = 'origin,hiragana,vietnam,english,englishToVn,chinese,chineseToVn\n'
    for (var i = 0; i < items.length; i++) {
      var item = items[i]
      var line = item.origin + ','  + item.hiragana + ',' + item.vietnam + ',' + item.english + ',' + item.englishToVn + ',' + item.chinese + ',' + item.chineseToVn + '\n'
      content = content.concat(line)
    }

    this.download(content, 'result.csv', 'text/plain')
  }

  download (content, fileName, contentType) {
    var a = document.createElement('a')
    var file = new Blob([content], { type: contentType })
    a.href = URL.createObjectURL(file)
    a.download = fileName
    a.click()
  }
}
