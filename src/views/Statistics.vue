<template>
  <div>
    <Layout>
      <Tabs :value.sync="type" class-prefix="type" :data-source="typeList"/>
      <Tabs :value.sync="interval" class-prefix="interval" :data-source="intervalList"/>
    </Layout>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import Button from '@/components/Button.vue';
  import Types from '@/components/Money/Types.vue';
  import Tabs from '@/components/Tabs.vue';


  @Component({
    components: {Tabs, Types, Button},
  })
  export default class Statistics extends Vue {
    interval = 'day';
    type = '-';
    typeList = [{text: '支出', value: '-'}, {text: '收入', value: '+'}];
    intervalList = [
      {text: '按天', value: 'day'},
      {text: '按周', value: 'week'},
      {text: '按月', value: 'Month'},
    ];
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/helper.scss";

  ::v-deep .type-tabs-item {
    background: #c4c4c4;

    &.selected {
      background: white;
    }

    &::after {
      display: none;
    }
  }

  ::v-deep .interval-tabs-item {
    height: 48px;
  }
</style>
