import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'

import App from './App'
import router from './router'
import store from './store'
import AudioPlugin from '../plugins/audio-plugin.js'

Vue.use(Vuetify)
if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false

// The global event bus.
// It's essentially a vue context which is decoupled from the main context (created below).
// Import this and use it to send events:
// EventBus.$emit('myEvent', eventArg)
// And to subscribe to an event:
// EventBus.$on('myEvent', function (eventArg) { })
export const EventBus = new Vue()

Vue.use(AudioPlugin)

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
