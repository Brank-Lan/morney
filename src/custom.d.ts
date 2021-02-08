type RecordItem = {
  tags: string[];
  notes: string;
  type: string;
  numberPad: string;
  createAt?: Date;
}
type Tag = {
  id: string;
  name: string;
}

interface Window {
  tagList: Tag[];
  createTag: (name: string) => void;
  findTag: (id: string) => Tag | undefined;
  removeTag: (id: string) => boolean;
  updateTag: (id: string, name: string) => string;
}
