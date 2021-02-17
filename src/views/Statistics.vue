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
  import intervalList from '@/constant/intervalList';
  import typeList from '@/constant/typeList';


  @Component({
    components: {Tabs, Types, Button},
  })
  export default class Statistics extends Vue {
    interval = 'day';
    type = '-';
    typeList = typeList;
    intervalList = intervalList;
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
</style>
