import recordListModel from '@/models/recordListModel';

const recordListStore = {
  recordList: recordListModel.fetch(),
  createRecordList: (record: RecordItem) => {
    recordListModel.create(record);
  },
}
export default recordListStore
