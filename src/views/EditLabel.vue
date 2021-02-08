<template>
  <Layout>
    <div class="navBar">
      <Icon class="leftIcon" name="left" @click.native="back"/>
      <span class="title">编辑标签</span>
    </div>
    <div class="form-wrapper">
      <FormItem field-name="标签" :placeholder="tag.name" @update:value="update"/>
    </div>
    <div class="button-wrapper">
      <Button @click="remove">删除标签</Button>
    </div>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import FormItem from '@/components/Money/FormItem.vue';
  import Button from '@/components/Button.vue';
  import tagListStore from '@/store/tagListStore';

  @Component({
    components: {Button, FormItem}
  })
  export default class EditLabel extends Vue {
    tag?: { id: string; name: string } | undefined;

    back() {
      this.$router.back();
    }

    update(name: string) {
      if (this.tag) {
        console.log(name);
        tagListStore.updateTag(this.tag.id, name);
      }
    }

    created() {
      const id = this.$route.params.id;
      const tag = tagListStore.findTag(id)
      if (tag) {
        this.tag = tag;
      } else {
        this.$router.replace('/404');
      }
    }

    remove() {
      if (this.tag) {
        tagListStore.removeTag(this.tag.id);
        this.$router.back();
      }
    }
  }
</script>

<style lang="scss" scoped>
  .navBar {
    text-align: center;
    font-size: 16px;
    padding: 12px 16px;
    background: white;
    display: flex;
    align-items: center;

    > .title {
      margin: auto;
    }

    > .leftIcon {
      width: 24px;
      height: 24px;
    }
  }

  .form-wrapper {
    background: white;
    margin-top: 8px;
  }

  .button-wrapper {
    text-align: center;
    padding: 16px;
    margin-top: 44-16px;
  }
</style>
