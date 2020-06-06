const localStorageKeyName = 'recordList'
const model = {
  alone(data: RecordItem){
    return JSON.parse(JSON.stringify(data)) as RecordItem;
  },
  fetch(){
    return JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]') as RecordItem[];
  },
  save(data: RecordItem[]){
    window.localStorage.setItem('recordList',JSON.stringify(data))
  }

}

export default model