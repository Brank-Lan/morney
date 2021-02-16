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

  @Component({
    components: {Button, FormItem},
  })
  export default class EditLabel extends Vue {
    get tag() {
      return this.$store.state.currentTag;
    }

    back() {
      this.$router.back();
    }

    update(name: string) {
      if (this.tag) {
        console.log(name);
        this.$store.commit('updateTag', {id: this.tag.id, name});
      }
    }

    created() {
      const id = this.$route.params.id;
      this.$store.commit('fetchTag');
      this.$store.commit('setCurrentTag', id);
      if (!this.tag) {
        this.$router.replace('/404');
      }
    }

    remove() {
      if (this.tag) {
        this.$store.commit('removeTag', this.tag.id);
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
