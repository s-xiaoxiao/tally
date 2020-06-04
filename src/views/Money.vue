<template>
  <Layout class-prefix="layout">
    <NumberPad @update:value="onUpdateAmount"/>
    <Types :type.sync="record.type"/>
    <Notes @update:value="onUpdateNotes"/>
    <Tags :data-source.sync="tags" @update:value="onUpdateTags"/>
    {{record}}
  </Layout>
</template>

<script lang="ts">
  import NumberPad from '@/components/Money/NumberPad.vue';
  import Notes from '@/components/Money/Notes.vue';
  import Types from '@/components/Money/Types.vue';
  import Tags from '@/components/Money/Tags.vue';

  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';

  type Record = {
    tags: string[];
    notes: string;
    type: string;
    amount: number;
  }

  @Component({
    components: {Tags, Types, Notes, NumberPad}
  })
  export default class Money extends Vue {
    tags = ['衣', '食', '住', '行'];
    record: Record = {
      tags: [],
      notes: '',
      type: '-',
      amount: 0
    };

    onUpdateTags(tags: string[]) {
      console.log(tags, typeof tags);
      this.record.tags = tags;
    }

    onUpdateNotes(value: string) {
      console.log(value, typeof value);
      this.record.notes = value;
    }
    onUpdateAmount(value: number) {
      console.log(value, typeof value);
      this.record.amount = value;
    }
  }

</script>

<style lang="scss">
  .layout-content {
    display: flex;
    flex-direction: column-reverse;
  }
</style>
