/*
Audio Plugin

To use this plugin, call audio events using the global event bus (see main.js for that)
audioTTS(text): Make the computer speak some text
audioBeep(): Make the computer beep
audioBoop(): Make the computer boop
*/

import { EventBus } from '../renderer/main.js'

const AudioPlugin = {
  install (Vue, options) {
    EventBus.$on('audioTTS', function (text) {
      var msg = new SpeechSynthesisUtterance(text)
      window.speechSynthesis.speak(msg)
    })

    EventBus.$on('audioBeep', function () {
      var msg = new SpeechSynthesisUtterance('beep')
      window.speechSynthesis.speak(msg)
    })

    EventBus.$on('audioBoop', function () {
      var msg = new SpeechSynthesisUtterance('boop')
      window.speechSynthesis.speak(msg)
    })
  }
}

export default AudioPlugin
