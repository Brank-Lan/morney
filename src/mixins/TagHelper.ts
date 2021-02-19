import Vue from 'vue';
import {Component} from 'vue-property-decorator';

@Component
export class TagHelper extends Vue {
  get tagList() {
    return this.$store.state.tagList;
  }

  created() {
    this.$store.commit('fetchTag');
    if (this.tagList <= 0) {
      this.$store.commit('createTag', '衣');
      this.$store.commit('createTag', '食');
      this.$store.commit('createTag', '住');
      this.$store.commit('createTag', '行');
    }
  }

  createTag() {
    const name = window.prompt('请输入标签名');
    if (!name) {
      window.alert('标签名不能为空');
      return;
    } else {
      this.$store.commit('createTag', name);
    }
  }
}

export default TagHelper;
