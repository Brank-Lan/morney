const localStorageKeyName = 'recordList';
const recordListModel = {
  fetch: function () {
    return JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]') as RecordItem[];
  },
  clone(record: RecordItem) {
    return JSON.parse(JSON.stringify(record));
  },
  save(recordList: RecordItem[]) {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(recordList));
  }
};
export default recordListModel;
