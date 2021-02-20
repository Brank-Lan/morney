<template>
  <a-modal :visible="visible" title="请输入标签名" ok-text="确认" cancel-text="取消" @ok="$emit('ok')"
           @cancel="$emit('update:visible',false)" :closable="false">
    <a-input
      placeholder="请输入你标签名"
      :value="tagName"
      @input="onValueChange($event.target.value)"
    />
  </a-modal>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';
  import {Modal, Input} from 'ant-design-vue';

  Modal.install(Vue);
  @Component({
    components: {[Modal.name]: Modal, [Input.name]: Input}
  })
  export default class MyModal extends Vue {
    // @Prop({required: true, type: Function}) ok!: () => {};
    @Prop({required: true, type: String}) tagName = '';
    @Prop({default: false, type: Boolean}) visible? = false;

    onValueChange(value: string) {
      this.$emit('update:tagName', value);
    }
  }
</script>

<style lang="scss" scoped>

</style>
