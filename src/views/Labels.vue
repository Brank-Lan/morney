<template>
  <div>
    <Layout>
      <div class="tags">
        <router-link :to="`/labels/edit/${tag.id}`" v-for="tag in tagList" :key="tag.id" class="tag">
          <span>{{tag.name}}</span>
          <Icon name="right"/>
        </router-link>
      </div>
      <div class="createTag-wrapper">
        <Button class="createTag" @click="createTag">新增标签</Button>
      </div>
    </Layout>
    <my-modal @ok="ok" :tag-name.sync="tagName" :visible.sync="visible"></my-modal>
  </div>
</template>

<script lang="ts">
  import {Component} from 'vue-property-decorator';
  import Button from '@/components/Button.vue';
  import {mixins} from 'vue-class-component';
  import TagHelper from '@/mixins/TagHelper';
  import MyModal from '@/components/MyModal.vue';

  @Component({
    components: {MyModal, Button},
  })
  export default class Labels extends mixins(TagHelper) {

  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/helper.scss";

  .tags {
    background: white;
    font-size: 16px;
    padding-left: 16px;

    > .tag {
      min-height: 44px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #e6e6e6;

      > span {
        flex-grow: 1;
      }

      svg {
        width: 24px;
        height: 24px;
        color: #666;
        margin-right: 16px;
      }
    }
  }

  .createTag {
    background: #767676;
    color: white;
    border-radius: 4px;
    border: none;
    height: 40px;
    padding: 0 16px;

    &-wrapper {
      text-align: center;
      padding: 16px;
      margin: 44-16px;
    }
  }

</style>
