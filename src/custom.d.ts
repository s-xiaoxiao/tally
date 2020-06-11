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

interface Window {
  tagList: Tag[];
}