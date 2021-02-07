<template>
  <div>
    <Layout class-prefix="layout">
      <NumberPad :value.sync="record.numberPad" @submit="saveRecord"/>
      <Types :value.sync="record.type"/>
      <div class="notes">
        <FormItem
          field-name="备注"
          placeholder="这里输入备注"
          @input="onUpdateNotes"
        />
      </div>
      <Tags :data-source.sync="tags" @update:value="onUpdateTags"/>
    </Layout>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import NumberPad from '@/components/Money/NumberPad.vue';
  import FormItem from '@/components/Money/FormItem.vue';
  import Tags from '@/components/Money/Tags.vue';
  import Types from '@/components/Money/Types.vue';
  import {Component, Watch} from 'vue-property-decorator';
  import model from '@/models/recordListModel';

  const version = window.localStorage.getItem('version') || '0';
  const recordList: RecordItem[] = model.fetch();
  if (version === '0.0.1') {
    recordList.forEach(record => {
      record.createAt = new Date(2020, 0, 1);
    });
    window.localStorage.setItem('recordList', JSON.stringify((recordList)));
  }

  window.localStorage.setItem('version', '0.0.2');
  @Component({
    components: {Types, Tags, FormItem, NumberPad},
  })
  export default class Money extends Vue {
    tags = ['衣', '食', '住', '行'];
    record: RecordItem = {
      tags: [], notes: '', type: '-', numberPad: '0'
    };
    recordList: RecordItem[] = JSON.parse(window.localStorage.getItem('recordList') || '[]');

    onUpdateTags(value: string[]) {
      this.record.tags = value;
    }

    onUpdateNotes(value: string) {
      this.record.notes = value;
    }

    saveRecord() {
      const record2: RecordItem = model.clone(this.record);
      record2.createAt = new Date();
      this.recordList.push(record2);
      console.log(this.recordList);
    }

    @Watch('recordList')
    onRecordListChanged(value: RecordItem[], oldValue: RecordItem[]) {
      model.save(value);
    }
  }
</script>
<style lang="scss">
  .layout-content {
    display: flex;
    flex-direction: column-reverse;
  }
  .notes{
    padding:12px 0;
  }
</style>
<style lang="scss" scoped>

</style>
