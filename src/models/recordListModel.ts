import clone from '@/lib/clone';
import createId from '@/lib/createId';

const localStorageKeyName = 'recordList';
type RecordListModel = {
  data: RecordItem[];
  fetch: () => RecordItem[];
  clone(record: RecordItem): RecordItem;
  save(recordList: RecordItem[]): void;
};
const recordListModel: RecordListModel = {
  data: [],
  fetch() {
    this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]') as RecordItem[];
    return this.data;
  },
  clone(record: RecordItem[] | RecordItem) {
    return clone(record);
  },
  save() {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
  }
};
export default recordListModel;
