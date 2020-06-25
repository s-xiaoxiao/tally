import Vue from 'vue'
import Vuex from 'vuex'
import clone from '@/lib/clone';
import createdId from '@/lib/createdId';

Vue.use(Vuex)
type RootState = {
  recordList:  RecordItem[];
  tagList: Tag[];
  currentTag?: Tag;
}
const store = new Vuex.Store({
  state:{
    recordList: [],
    tagList: [],
    currentTag: undefined
  } as RootState,
  mutations: {
    // Record
    fetchRecords(state) {
      state.recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]') as RecordItem[];
    },
    createRecord(state,record: RecordItem) {
      const record2 = clone(record);
      record2.createdAt = new Date();
      state.recordList.push(record2);
      store.commit('saveRecord');
    },
    saveRecord(state) {
      window.localStorage.setItem('recordList', JSON.stringify(state.recordList));
    },
    // Tag
    fetchTags(state) {
      state.tagList = JSON.parse(window.localStorage.getItem('tagList') || '[]');
    },
    createdTag(state){
      let name = window.prompt('输入标签名');
      if(name === null) {return}
      while(!name){
        window.alert('不能为空')
        name = window.prompt('输入标签名')
      }
      const names = state.tagList.map((item) => item.name);
      if (names.indexOf(name) >= 0) {
        window.alert('标签名重复');
        store.commit('createdTag')
        return
      }
      const id = createdId().toString();
      state.tagList.push({id, name: name});
      store.commit('saveTags')},
    removeTag(state,id: string) {
      let index = -1;
      const len = state.tagList.length;
      for (let i = 0; i < len; i++) {
        if (store.state.tagList[i].id === id) {
          index = i;
          break;
        }
      }
      state.tagList.splice(index, 1);
      store.commit('saveTags')
      // window.tagList = this.fetch()
    },
    updateTag(state,{id,name}) {
      if (!name) {window.alert('不能为空');}
      const idList = state.tagList.map(item => item.id);
      if (idList.indexOf(id) >= 0) {
        const names = state.tagList.map(item => item.name);
        if (names.indexOf(name) >= 0) {
          return 'duplicated';
        } else {
          const tag = state.tagList.filter(item => item.id === id)[0];
          tag.name = name;
          store.commit('saveTags')
          return 'success';
        }
      } else {
        return 'not found';
      }
    },
    findTag(state,id: string) {
      state.currentTag = state.tagList.filter(t => t.id === id)[0];
    },
    saveTags(state) {
      window.localStorage.setItem('tagList', JSON.stringify(state.tagList));
    }
  },

})

export default store;
