<template>
  <div class="header">
    <div class="header__logo"><NuxtLink to="/"></NuxtLink></div>
    <div class="header__nav header-nav">
      <div class="header-nav__item">
        <NuxtLink to="/register">新規登録</NuxtLink>
      </div>
      <div class="header-nav__item">
        <NuxtLink to="/login">ログイン</NuxtLink>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.header {
  height: 80px;
  padding: 0 20px;
  background-color: rgb(230, 100, 122);
  box-shadow: 0 0 3px 3px rgb(126, 70, 80);
  display: flex;
  align-items: center;
  justify-content: space-between;
  &__logo {
    width: 100px;
    & a.nuxt-link-active {
      width: 100%;
      display: block;
      padding-top: 40%;
      background: url("~/assets/img/logo.png");
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
    }
  }
  & a {
    text-decoration: none;
    color: white;
    padding: 10px 0;
  }
}
.header-nav {
  display: flex;
  align-items: flex-end;
  &__item {
    margin-right: 20px;
  }
}
</style>
