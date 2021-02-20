<template>
  <div class="tags">
    <div class="new">
      <button @click="createTag">新增标签</button>
    </div>
    <ul class="current">
      <li
        v-for="tag in tagList"
        :key="tag.id"
        :class="{selected: value.indexOf(tag)>=0}"
        @click="toggle(tag)">
        {{tag.name}}
      </li>
    </ul>
    <my-modal :tag-name.sync="tagName" :visible.sync="visible" @ok="ok"></my-modal>
  </div>
</template>

<script lang="ts">
  import {Component, Prop} from 'vue-property-decorator';
  import {mixins} from 'vue-class-component';
  import TagHelper from '@/mixins/TagHelper';
  import MyModal from '@/components/MyModal.vue';

  @Component({
    components: {MyModal}
  })
  export default class Tags extends mixins(TagHelper) {
    @Prop({default: [], type: Array, required: true})
    value!: Tag[];
    selectedSource: Tag[] = [];

    toggle(tag: Tag) {
      const index = this.selectedSource.indexOf(tag);
      if (index >= 0) {
        this.selectedSource.splice(index, 1);
      } else {
        this.selectedSource.push(tag);
      }
      this.$emit('update:value', this.selectedSource);
    }

  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/helper.scss";

  .tags {
    background: white;
    font-size: 14px;
    padding: 16px;
    display: flex;
    flex-direction: column-reverse;
    flex-grow: 1;
    margin-bottom: 0;

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
