// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import Meta from 'vue-meta';
import App from './App';
import router from './router';

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(Meta);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
});
