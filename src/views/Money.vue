<template>
  <div>
    <Layout class-prefix="layout">
      <NumberPad :value.sync="record.numberPad" @submit="saveRecord"/>
      <Types :value.sync="record.type"/>
      <div class="notes">
        <FormItem
          field-name="备注"
          placeholder="这里输入备注"
          :value.sync="record.notes"
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
  import {Component} from 'vue-property-decorator';

  @Component({
    components: {Types, Tags, FormItem, NumberPad},
    computed: {
      recordList() {
        return this.$store.state.recordList;
      }
    }
  })
  export default class Money extends Vue {
    // tags: Tag[] = store.tagList;
    record: RecordItem = {
      tags: [], notes: '', type: '-', numberPad: '0'
    };

    created() {
      this.$store.commit('fetchRecords');
    }

    onUpdateTags(value: string[]) {
      this.record.tags = value;
    }

    saveRecord() {
      this.$store.commit('createRecordList', this.record);
    }
  }
</script>
<style lang="scss">
  .layout-content {
    display: flex;
    flex-direction: column-reverse;
  }

  .notes {
    padding: 12px 0;
  }
</style>
<style lang="scss" scoped>

</style>
