<template>
  <div>
    <Layout class-prefix="layout">
      <NumberPad/>
      <Types :xxx="0"/>
      <Notes/>
      <Tags :data-source.sync="tags"/>
    </Layout>
  </div>
</template>

<script lang="js">
  import NumberPad from '@/components/Money/NumberPad.vue';
  import Notes from '@/components/Money/Notes.vue';
  import Tags from '@/components/Money/Tags.vue';
  import Types from '@/components/Money/Types.vue';
  export default {
    name: 'Money',
    components: {Types, Tags, Notes, NumberPad},
    data(){
      return{
        tags:['衣','食','住','行']
      }
    }
  };
</script>
<style lang="scss">
  .layout-content{
    display: flex;
    flex-direction: column-reverse;
  }
</style>
<style lang="scss" scoped>

</style>
