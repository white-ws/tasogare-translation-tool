
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
    let header = ''
    let content = ''
    items.forEach((item, index) => {
      if (index === 0) header = Object.keys(item).toString() + '\n'
      let line = Object.values(item).toString() + '\n'
      content = content.concat(line)
    })
    content = header.concat(content)
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
