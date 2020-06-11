import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import Nav from '@/components/Nav.vue';
import Layout from '@/components/Layout.vue';
import Icon from '@/components/Icon.vue';
import tagListModel from '@/models/tagListModel';

Vue.config.productionTip = false;

Vue.component('Nav', Nav);
Vue.component('Layout', Layout);
Vue.component('Icon', Icon);

window.tagList = tagListModel.fetch();
window.createdTag=function(name){
  const message = tagListModel.create(name)
  console.log(message);
  if(message === 'duplicated'){
    window.alert('标签名重复')
    this.createdTag(name)
  }
}
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
