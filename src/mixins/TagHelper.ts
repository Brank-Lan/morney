import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import {Modal, message, Input} from 'ant-design-vue';
// import 'ant-design-vue/lib/modal/style/css';
// import 'ant-design-vue/lib/input/style/css';
// import 'ant-design-vue/lib/message/style/css';

Modal.install(Vue);

@Component({
  components: {[Modal.name]: Modal, [Input.name]: Input},
})
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
      message.error('标签名不能为空', 2);
      return;
    } else {
      this.visible = false;
      this.$store.commit('createTag', this.tagName);
      message.success('添加成功', 2);
    }
  }
}

export default TagHelper;
