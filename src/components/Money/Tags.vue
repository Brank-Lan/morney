<template>
  <div class="tags">
    <div class="new">
      <button @click="create">新增标签</button>
    </div>
    <ul class="current">
      <li v-for="tag in dataSource" :key="tag" :class="{selected: selectedSource.indexOf(tag)>=0}" @click="toggle(tag)">
        {{tag}}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';

  @Component
  export default class Tags extends Vue {
    @Prop(Array) dataSource: string[] | undefined;
    selectedSource: string[] = [];

    toggle(tag: string) {
      const index = this.selectedSource.indexOf(tag);
      if (index >= 0) {
        this.selectedSource.splice(index, 1);
      } else {
        this.selectedSource.push(tag)
      }
    }
    create(){
      const name = window.prompt('请输入标签名')
      if (name === '') {
        window.alert('标签名不能为空')
      }else if(this.dataSource){
        this.$emit('update:dataSource',[...this.dataSource,name])
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/helper.scss";

  .tags {
    font-size: 14px;
    padding: 16px;
    display: flex;
    flex-direction: column-reverse;
    flex-grow: 1;

    > .current {
      display: flex;
      flex-wrap: wrap;

      > li {
        $bg: #d9d9d9;
        background: $bg;
        $h: 24px;
        height: $h;
        line-height: $h;
        border-radius: $h/2;
        padding: 0 16px;
        margin-right: 12px;
        margin-top: 4px;

        &.selected {
          background: darken($bg, 50%);
          color: #f5f5f5;
        }
      }
    }

    > .new {
      padding-top: 16px;

      button {
        background: transparent;
        border: none;
        color: #999;
        padding: 0 4px;
        border-bottom: 1px solid;
      }
    }
  }
</style>
