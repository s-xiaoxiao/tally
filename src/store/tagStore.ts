import createdId from '@/lib/createdId';

const localStorageKeyName = 'tagList';

const tagStore = {
  tagList: [] as Tag[],
  fetchTags() {
    this.tagList = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]');
    return this.tagList;
  },
  findTag(id: string) {
    return this.tagList.filter(t => t.id === id)[0];
  },
  createdTag(){
    let name = window.prompt('输入标签名');
    while(!name){
      window.alert('不能为空')
      name = window.prompt('输入标签名')
    }
    const names = this.tagList.map((item) => item.name);
    if (names.indexOf(name) >= 0) {
      window.alert('标签名重复');
      this.createdTag();
      return
    }
    const id = createdId().toString();
    this.tagList.push({id, name: name});
    this.saveTags();
  },
  removeTag(id: string) {
    let index = -1;
    const len = this.tagList.length;
    for (let i = 0; i < len; i++) {
      if (this.tagList[i].id === id) {
        index = i;
        break;
      }
    }
    this.tagList.splice(index, 1);
    this.saveTags();
    // window.tagList = this.fetch()
    return true;
  },
  updateTag(id: string, name: string) {
    if (!name) {window.alert('不能为空');}
    const idList = this.tagList.map(item => item.id);
    if (idList.indexOf(id) >= 0) {
      const names = this.tagList.map(item => item.name);
      if (names.indexOf(name) >= 0) {
        return 'duplicated';
      } else {
        const tag = this.tagList.filter(item => item.id === id)[0];
        tag.name = name;
        this.saveTags();
        return 'success';
      }
    } else {
      return 'not found';
    }
  },
  saveTags() {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.tagList));
  }
};
tagStore.fetchTags();
export default tagStore;