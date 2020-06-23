import tagListModel from '@/models/tagListModel';

export default {
  tagList:tagListModel.fetch(),
  findTag(id: string){
    return this.tagList.filter(t=> t.id === id)[0]
  },
  createdTag:function(){
    const name = window.prompt('输入标签名')
    const message = name && tagListModel.create(name)

    if(message === 'duplicated'){
      window.alert('标签名重复')
      this.createdTag()
    }
  },
  removeTag:function(id: string){
    return tagListModel.remove(id)
  },
  updateTag:function(id: string,name: string) {
    return tagListModel.update(id,name);
  }
}