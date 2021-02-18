<template>
  <div>
    <Layout>
      <Tabs :value.sync="type" class-prefix="type" :data-source="typeList"/>
      <Tabs :value.sync="interval" class-prefix="interval" :data-source="intervalList"/>
      <ol>
        <li v-for="(group,index) in groupList" :key="index">
          <h3 class="title">{{beauty(group.title)}}</h3>
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
  import clone from '@/lib/clone';
  import dayjs from 'dayjs';


  @Component({
    components: {Tabs, Types, Button},
  })
  export default class Statistics extends Vue {
    get recordList() {
      return (this.$store.state as RootState).recordList;
    }

    get groupList() {
      const {recordList} = this;
      /*[
        {title,item[]}
      ]*/
      const newList = clone(recordList).sort((a: RecordItem, b: RecordItem) => {return dayjs(b.createAt).valueOf() - dayjs(a.createAt).valueOf();});
      const result = [{title: newList[0].createAt, items: [newList[0]]}];
      for (let i = 0; i < newList.length; i++) {
        const current = newList[i];
        const last = result[result.length - 1];
        if (dayjs(last.title).isSame(dayjs(current.createAt), 'day')) {
          last.items.push(current);
        } else {
          result.push({title: current.createAt, items: [current]});
        }
      }
      return result;
    }

    interval = 'day';
    type = '-';
    typeList = typeList;
    intervalList = intervalList;

    beforeCreate() {
      this.$store.commit('fetchRecordList');
    }

    beauty(string: string) {
      const now = dayjs();
      const day = dayjs(string);
      if (day.isSame(now, 'day')) {
        return '今天';
      } else if (day.isSame(now.subtract(1, 'day'), 'day')) {
        return '昨天';
      } else if (day.isSame(now.subtract(2, 'day'), 'day')) {
        return '前天';
      } else if (day.isSame(now, 'year')) {
        return day.format('M月D日');
      } else {
        return day.format('YYYY年M月D日');
      }
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
