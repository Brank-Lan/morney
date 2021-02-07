<template>
  <div>
    <label class="formItem">
      <span class="name">{{fieldName}}</span>
      <input type="text" :placeholder="placeholder" :value="value" @input="onValueChange($event.target.value)">
    </label>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component,Prop, Watch} from 'vue-property-decorator';

  @Component
  export default class FormItem extends Vue {
    @Prop({default:''})value = '';
    @Prop({required:true}) fieldName!: string
    @Prop() placeholder?: string
    @Watch('value')
    onValueChange(value: string, oldValue: string) {
      this.$emit('input', value);
    }

  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/helper.scss";

  .formItem {
    font-size: 14px;
    padding-left: 16px;
    display: flex;
    align-items: center;
    .name {
      padding-right: 16px;
    }

    input {
      height: 40px;
      display: flex;
      flex-grow: 1;
      background: transparent;
      border: none;
      padding-right: 16px;
    }
  }
</style>
