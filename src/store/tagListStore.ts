import createId from '@/lib/createId';

const localStorageKeyName = 'tagList';
const tagListStore = {
  tagList: [] as Tag[],
  fetchTag() {
    this.tagList = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]');
    return this.tagList;
  },
  createTag(name: string) {
    const names = this.tagList.map(tag => tag.name);
    if (names.indexOf(name) >= 0) {
      return 'duplicated';
    }
    const id = createId().toString();
    this.tagList.push({
      id,
      name: name
    });
    this.saveTags();
    return 'success';
  },
  saveTags() {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.tagList));
  },
  findTag(id: string) {
    return this.tagList.filter(t => t.id === id)[0];
  },
  removeTag(id: string) {
    let index = -1;
    for (let i = 0; i < this.tagList.length; i++) {
      if (this.tagList[i].id === id) {
        index = i;
        break;
      }
    }
    if (index >= 0) {
      this.tagList.splice(index, 1);
      this.saveTags();
      return true;
    } else {
      return false;
    }
  },
  updateTag(id: string, name: string) {
    const idList = this.tagList.map(item => item.id);
    if (idList.indexOf(id) >= 0) {
      const names = this.tagList.map(item => item.name);
      if (names.indexOf(name) >= 0) {
        return 'duplicated';
      } else {
        const tag = this.findTag(id);
        tag.name = name;
        this.saveTags();
        return 'success';
      }
    } else {
      return 'not found';
    }
  },
};
tagListStore.fetchTag();
export default tagListStore;
