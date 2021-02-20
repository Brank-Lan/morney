import Vue from 'vue';
import {Component} from 'vue-property-decorator';


@Component
export class TagHelper extends Vue {
  visible = false;
  tagName = '';

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
    this.visible = true;
  }

  ok() {
    if (!this.tagName) {
      this.$message.error('标签名不能为空', 2);
      return;
    } else {
      this.visible = false;
      this.$store.commit('createTag', this.tagName);
    }
  }
}

export default TagHelper;
