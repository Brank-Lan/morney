import Vue from 'vue';
import Vuex from 'vuex';
import clone from '@/lib/clone';
import createId from '@/lib/createId';

const localStorageTagList = 'tagList';
const localStorageRecordList = 'recordList';
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    recordList: [] as RecordItem[],
    tagList: [] as Tag[],
  },
  mutations: {
    fetchRecordList(state) {
      state.recordList = JSON.parse(window.localStorage.getItem(localStorageRecordList) || '[]') as RecordItem[];
      return state.recordList;
    },
    createRecordList(state, record: RecordItem) {
      const record2: RecordItem = clone(record);
      record2.createAt = new Date();
      state.recordList && state.recordList.push(record2);
      store.commit('saveRecord');
    },
    saveRecord() {
      window.localStorage.setItem(localStorageRecordList, JSON.stringify(this.recordList));
    },
    fetchTag(state) {
      state.tagList = JSON.parse(window.localStorage.getItem(localStorageTagList) || '[]');
      return state.tagList;
    },
    createTag(state, name: string) {
      const names = state.tagList.map(tag => tag.name);
      if (names.indexOf(name) >= 0) {
        window.alert('标签名重复了');
        return 'duplicated';
      }
      const id = createId().toString();
      state.tagList.push({
        id,
        name: name
      });
      store.commit('saveTags');
      window.alert('创建成功');
      return 'success';
    },
    removeTag(state, id: string) {
      let index = -1;
      for (let i = 0; i < this.tagList.length; i++) {
        if (state.tagList[i].id === id) {
          index = i;
          break;
        }
      }
      if (index >= 0) {
        state.tagList.splice(index, 1);
        store.commit('saveTags');
        return true;
      } else {
        return false;
      }
    },
    updateTag(state, {id, name}: Tag) {
      const idList = state.tagList.map(item => item.id);
      if (idList.indexOf(id) >= 0) {
        const names = state.tagList.map(item => item.name);
        if (names.indexOf(name) >= 0) {
          return 'duplicated';
        } else {
          const tag = state.tagList.filter(t => t.id === id)[0];
          tag.name = name;
          store.commit('saveTags');
          return 'success';
        }
      } else {
        return 'not found';
      }
    },
    saveTags() {
      window.localStorage.setItem(localStorageTagList, JSON.stringify(this.tagList));
    },
  },
});
export default store;
