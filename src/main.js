import Vue from 'vue'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import App from './App.vue'
import VueCordova from 'vue-cordova'


Vue.use(MintUI);
Vue.use(VueCordova);
// Vue.cordova.on('deviceready', () => {
//     console.log('Cordova : device is ready !')
// });

// new Vue({
//   el: '#app',
//   render: h => h(App)
// })
new Vue({
    el: '#app',
    render: h => h(App)
}).$mount('#app');
