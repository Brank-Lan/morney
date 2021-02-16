<template>
  <div>
    <Layout>
      <p>{{count}}</p>
      <button @click="$store.commit('increment',10)">count+1</button>
    </Layout>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import store from '@/store/index2';
  import {Component} from 'vue-property-decorator';
  import Button from '@/components/Button.vue';

  @Component({
    components: {Button},
    computed: {
      count() {
        return this.$store.state.count;
      }
    }
  })
  export default class Statistics extends Vue {
    addCount() {
      store.add();
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/helper.scss";

  p {
    color: $color-highlight;
  }
</style>
