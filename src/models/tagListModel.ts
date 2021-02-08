import createId from '@/lib/createId';

const localStorageKeyName = 'tagList';
type TagListModel = {
  data: tag[];
  fetch: () => tag[];
  create: (name: string) => 'success' | 'duplicated'; //联合类型
  update: (id: string, name: string) => 'success' | 'duplicated' | 'not found';
  save: () => void;
  remove: (id: string) => boolean;
}
const tagListModel: TagListModel = {
  data: [],
  fetch() {
    this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]');
    return this.data;
  },
  update(id, name) {
    console.log('update');
    const idList = this.data.map(item => item.id);
    if (idList.indexOf(id) >= 0) {
      const names = this.data.map(item => item.name);
      if (names.indexOf(name) >= 0) {
        return 'duplicated';
      } else {
        const tag = this.data.filter(item => item.id === id)[0];
        tag.name = name;
        this.save();
        return 'success';
      }
    } else {
      return 'not found';
    }
  },
  create(name) {
    const names = this.data.map(tag => tag.name);
    if (names.indexOf(name) >= 0) {return 'duplicated';}
    const id = createId().toString();
    this.data.push({
      id,
      name: name
    });
    this.save();
    return 'success';
  },
  save() {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
  },
  remove(id) {
    let index = -1;
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i].id === id) {
        index = i;
        break;
      }
    }
    if (index >= 0) {
      this.data.splice(index, 1);
      this.save();
      return true;
    } else {
      return false;
    }

  }
};
export default tagListModel;
