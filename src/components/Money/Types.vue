<template>
  <div>
    <ul class="types">
      <li :class="type==='-'&&'selected'" @click="selectType('-')">支出</li>
      <li :class="type==='+'&&'selected'" @click="selectType('+')">收入</li>
    </ul>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';

  @Component
  export default class Type extends Vue {
    type = '-';
    @Prop(Number) xxx: number | undefined;
    //Props告诉Vue xxx 不是 data是prop
    //Number告诉Vue xx运行时是个Number
    //xxx 属性名
    // number | undefined告诉Ts xxx的编译时类型
    selectType(type: string) {
      if (type !== '-' && type !== '+') {
        throw new Error('type is unknown');
      }
      this.type = type;
    }

    mounted() {
      console.log(this.xxx);
    }
  }
  // const TypeProps = Vue.extend({
  //   props: {
  //     name: String
  //   }
  // });
  // @Component
  // export default class Type extends TypeProps {
  //   type = '-'; //type为‘+’表示收入，为'-'表示支出
  //
  //   selectType(type: string) {
  //     if (type !== '-' && type !== '+') {
  //       throw new Error('type is unknown');
  //     }
  //     this.type = type;
  //   }
  //
  //   create() {
  //     console.log(this.name);
  //   }
  // }
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/helper.scss";

  .types {
    background: #c4c4c4;
    display: flex;
    font-size: 24px;

    > li {
      width: 50%;
      height: 64px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;

      &.selected::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 4px;
        background: #333;
      }
    }
  }
</style>
