type RecordItem = {
  tags: Tag[];
  notes: string;
  type: string;
  amount: number;
  createAt?: string;
}
type RecordListModel = {
  data: RecordItem[];
  fetch: () => RecordItem[];
  clone: (record: RecordItem) => RecordItem;
  save: () => void;
  create: (record: RecordItem) => void;
};
type Tag = {
  id: string;
  name: string;
}
type DataSourceItem = { text: string; value: string }
type RootState = {
  recordList: RecordItem[];
  tagList: Tag[];
  currentTag?: Tag;
  stateError?: string;
};
