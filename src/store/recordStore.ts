import clone from '@/lib/clone';

const localStorageKeyName = 'recordList';

const recordStore = {
  recordList: [] as RecordItem[],
  fetchRecord() {
    this.recordList = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]') as RecordItem[];
    return this.recordList;

  },
  createRecord(record: RecordItem) {
    const record2 = clone(record);
    record2.createdAt = new Date();
    this.recordList.push(record2);
    this.saveRecord();
  },
  saveRecord() {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.recordList));
  }
};
recordStore.fetchRecord();

export default recordStore;