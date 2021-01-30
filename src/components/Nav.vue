<template>
  <nav>
    <router-link to="/money" class="item" active-class="selected">
      <Icon name="money"/>
      记账
    </router-link>
    <router-link to="/labels" class="item" active-class="selected">
      <Icon name="label"/>
      标签
    </router-link>
    <router-link to="/statistics" class="item" active-class="selected">
      <Icon name="statistics"/>
      统计
    </router-link>
  </nav>
</template>

<script lang="ts">
  // import x from '@/assets/icons/money.svg';

  export default {
    name: 'Nav'
  };
</script>

<style lang="scss" scoped>
  nav{
    display: flex;
    box-shadow: 0 0 3px rgba(0,0,0,0.25);
    justify-content: center;
    align-items: center;
    font-size: 12px;
    > .item{
      display: flex;
      flex-direction: column;
      align-items: center;
      width:33.3333%;
      padding: 2px 0;
        .icon{
          width: 32px;
          height:32px;
        }
    }
    .selected{
      color:red;
    }
  }

</style>
