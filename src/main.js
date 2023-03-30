import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import { loadFonts } from './plugins/webfontloader';
import store from './Store/Store';
import '@fortawesome/fontawesome-free/css/all.css';

loadFonts();

createApp(App)
  .use(store)
  .use(router)
  .use(vuetify)
  .mount('#app');
