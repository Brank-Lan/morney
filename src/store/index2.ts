import tagListStore from '@/store/tagListStore';
import recordListStore from '@/store/recordListStore';

const store = {
  count: 0,
  add() {
    this.count += 1;
  },
  ...tagListStore,
  ...recordListStore
};
export default store;
