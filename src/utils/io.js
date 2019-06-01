
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
      return value
    }

    return null
  }
}
