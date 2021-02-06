const localStorageKeyName = 'tagList';
type tag = {
  id: string;
  name: string;
}
type TagListModel = {
  data: tag[];
  fetch: () => tag[];
  create: (name: string) => 'success' | 'duplicated'; //联合类型
  save: () => void;
}
const tagListModel: TagListModel = {
  data: [],
  fetch() {
    this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]');
    return this.data;
  },
  create(name) {
    const names = this.data.map(tag => tag.name);
    if (names.indexOf(name) >= 0) {return 'duplicated';}
    this.data.push({
      id: name,
      name: name
    });
    this.save();
    return 'success';
  },
  save() {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
  }
};
export default tagListModel;
