<template>
  <div>
    <label class="notes">
      <span class="name">{{fieldName}}</span>
      <input type="text" :placeholder="placeholder" v-model="value">
    </label>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component,Prop, Watch} from 'vue-property-decorator';

  @Component
  export default class Notes extends Vue {
    value = '';
    @Prop({required:true}) fieldName!: string
    @Prop() placeholder?: string
    @Watch('value')
    onValueChanged(value: string, oldValue: string) {
      this.$emit('update:value', value);
    }

  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/helper.scss";

  .notes {
    font-size: 14px;
    padding-left: 16px;
    background: #f5f5f5;
    display: flex;
    align-items: center;

    .name {
      padding-right: 16px;
    }

    input {
      height: 64px;
      display: flex;
      flex-grow: 1;
      background: transparent;
      border: none;
      padding-right: 16px;
    }
  }
</style>
