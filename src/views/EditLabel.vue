<template>
  <div>
    <Icon name="left" @click.native="back"/>
    <span>编辑标签</span>
    <Notes field-name="标签" placeholder="输入标签"/>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import tagListModel from '@/models/tagListModel';
  import Notes from '@/components/Money/Notes.vue';

  @Component({
    components: {Notes}
  })
  export default class EditLabel extends Vue {
    back() {
      this.$router.replace('/labels');
    }

    created() {
      const id = this.$route.params.id;
      tagListModel.fetch();
      const tags = tagListModel.data;
      const tag = tags.filter(t => t.id === id)[0];
      if (tag) {
        console.log(tag);
      } else {
        this.$router.replace('/404');
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
