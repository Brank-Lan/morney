import Vue from 'vue';
import Vuex from 'vuex';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import 'ant-design-vue/dist/antd.css';
import '@/assets/style/reset.scss';
import Nav from '@/components/Nav.vue';
import Layout from '@/components/Layout.vue';
import Icon from '@/components/Icon.vue';


Vue.config.productionTip = false;
Vue.component('Layout', Layout);
Vue.component('Nav', Nav);
Vue.component('Icon', Icon);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

window.onload = () => {
  const yMax = document.body.scrollHeight;
  console.log(yMax);
  setTimeout(function () {
    window.scrollTo(0, yMax);
  }, 0);

};

if (document.documentElement.clientWidth > 500) {
  window.alert('请使用手机打开本页面，以保住浏览效果');
}
