<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
  @import '~@/assets/style/reset.scss';
  *{
    margin: 0;
    padding: 0;
  }
  *,*:after,*:before{
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  a{
    text-decoration: none;
    color: inherit;
  }
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
