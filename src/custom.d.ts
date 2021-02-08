type RecordItem = {
  tags: string[];
  notes: string;
  type: string;
  numberPad: string;
  createAt?: Date;
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
