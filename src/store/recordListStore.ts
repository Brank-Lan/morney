import clone from '@/lib/clone';

const localStorageKeyName = 'recordList';
const recordListStore = {
  recordList: [] as RecordItem[],
  fetch() {
    this.recordList = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]') as RecordItem[];
    return this.recordList;
  },
  createRecordList(record: RecordItem) {
    const record2 = clone(record);
    record2.createAt = new Date();
    this.recordList && this.recordList.push(record2);
    this.saveRecord();
  },
  saveRecord() {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.recordList));
  }
};
recordListStore.fetch();
export default recordListStore;
