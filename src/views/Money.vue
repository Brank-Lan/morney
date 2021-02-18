<template>
  <div>
    <Layout class-prefix="layout">
      <NumberPad :value.sync="record.amount" @submit="saveRecord"/>
      <Tabs :data-source="typeList" :value.sync="record.type"/>
      <!--      <Types :value.sync="record.type"/>-->
      <div class="notes">
        <FormItem
          field-name="备注"
          placeholder="这里输入备注"
          :value.sync="record.notes"
        />
      </div>
      <Tags :data-source.sync="record.tags" @update:value="onUpdateTags"/>
    </Layout>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import NumberPad from '@/components/Money/NumberPad.vue';
  import FormItem from '@/components/Money/FormItem.vue';
  import Tags from '@/components/Money/Tags.vue';
  import Types from '@/components/Money/Types.vue';
  import {Component} from 'vue-property-decorator';
  import Tabs from '@/components/Tabs.vue';

  @Component({
    components: {Tabs, Types, Tags, FormItem, NumberPad},
  })
  export default class Money extends Vue {
    // tags: Tag[] = store.tagList;

    get recordList() {
      return this.$store.state.recordList;
    }

    typeList: DataSourceItem[] = [{text: '支出', value: '-'}, {text: '收入', value: '+'}];
    record: RecordItem = {
      tags: [], notes: '', type: '-', amount: 0
    };

    created() {
      this.$store.commit('fetchRecordList');
    }

    onUpdateTags(value: Tag[]) {
      this.record.tags = value;
    }

    saveRecord() {
      this.$store.commit('createRecordList', this.record);
    }
  }
</script>
<style lang="scss" scoped>
  ::v-deep .layout-content {
    display: flex;
    flex-direction: column-reverse;
  }

  ::v-deep .notes {
    padding: 12px 0;
  }
</style>
