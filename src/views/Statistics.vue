<template>
  <div>
    <Layout>
      <Tabs :value.sync="type" class-prefix="type" :data-source="typeList"/>
      <Tabs :value.sync="interval" class-prefix="interval" :data-source="intervalList"/>
      <ol>
        <li v-for="(group,index) in result" :key="index">
          <h3 class="title">{{group.title}}</h3>
          <ol>
            <li class="record" v-for="(item, index) in group.items" :key="index">
              <span>{{tagString(item.tags)}}</span>
              <span class="notes">{{item.notes}}</span>
              <span>￥{{item.numberPad}}</span>
            </li>
          </ol>
        </li>
      </ol>
    </Layout>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import Button from '@/components/Button.vue';
  import Types from '@/components/Money/Types.vue';
  import Tabs from '@/components/Tabs.vue';
  import intervalList from '@/constant/intervalList';
  import typeList from '@/constant/typeList';


  @Component({
    components: {Tabs, Types, Button},
  })
  export default class Statistics extends Vue {
    get recordList() {
      return (this.$store.state as RootState).recordList;
    }

    get result() {
      const {recordList} = this;
      type HashTableValue = { title: string; items: RecordItem[] }
      const hashTable: { [key: string]: HashTableValue } = {};
      for (let i = 0; i < recordList.length; i++) {
        const [date, time] = recordList[i].createAt!.split('T');
        hashTable[date] = hashTable[date] || {title: date, items: []};
        hashTable[date].items.push(recordList[i]);
      }
      return hashTable;
    }

    interval = 'day';
    type = '-';
    typeList = typeList;
    intervalList = intervalList;

    beforeCreate() {
      this.$store.commit('fetchRecordList');
    }

    tagString(tags: Tag[]) {
      const tagNames: string[] = tags.map(tag => tag.name);
      return tags.length === 0 ? '无' : tagNames.join(',');
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/helper.scss";

  ::v-deep {
    .type-tabs-item {
      background: #c4c4c4;

      &.selected {
        background: white;
      }

      &::after {
        display: none;
      }
    }

    .interval-tabs-item {
      height: 48px;
    }
  }

  %item {
    padding: 8px 16px;
    line-height: 24px;
    display: flex;
    justify-content: space-between;
    align-content: center;
  }

  .title {
    @extend %item
  }

  .record {
    background: white;
    display: flex;
    align-items: center;
    @extend %item
  }

  .notes {
    margin-right: auto;
    margin-left: 16px;
    color: #999;
  }
</style>
