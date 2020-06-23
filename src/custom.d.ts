type RecordItem = {
  tags: string[];
  notes: string;
  type: string;
  amount: number;
  createdAt?: Date;
}
// ? 是 | undefined 的语法糖

type Tag = {
  id: string;
  name: string;
}
type TagListModel = {
  data: Tag[];
  fetch: () => Tag[];
  create: (name: string) => 'success' | 'duplicated';
  update: (id: string,name: string) => 'success' | 'duplicated' | 'not found' | undefined;
  remove: (id: string) => boolean;
  save: () => void;
}

