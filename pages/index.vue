<template>
  <div class="index">
    <div class="home">
      <div class="home__title">Home</div>
      <div class="home__share share-box">
        <div class="share-box__input">
          <textarea
            id="textarea"
            v-model="content"
            placeholder="今何してる？"
            @input="areaFlex()"
          ></textarea>
        </div>
        <div class="share-box__button">share</div>
      </div>
      <div class="home__posts"></div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component({
  layout: "nonHeader"
  // components: {
  // },
})
export default class Index extends Vue {
  private content = "";

  private areaFlex(): void {
    let textarea = document.getElementById("textarea");
    let clientHeight = textarea.clientHeight;
    textarea.style.height = clientHeight + "px";
    let scrollHeight = textarea.scrollHeight;
    textarea.style.height = scrollHeight + "px";
  }
}
</script>
<style lang="scss" scoped>
.home {
  // position: relative;
  max-width: 700px;
  width: 100%;
  margin: 0 auto;
  border-left: 1px solid white;
  border-right: 1px solid white;
  &__title {
    position: sticky;
    top: 0;
    padding: 5px 0 5px 10px;
    width: 100%;
    background-color: rgb(221, 154, 159);
    font-size: 28px;
    color: white;
    font-weight: 900;
    border-bottom: 1px solid white;
    z-index: 1;
  }
  &__share {
    height: 300px;
  }
  &__posts {
    height: 2000px;
    background-color: rgb(197, 51, 51);
  }
}
@media screen and (max-width: 700px) {
  .home {
    border: none;
  }
}
.share-box {
  &__input {
    & textarea {
      background-color: rgb(221, 154, 159);
      border: none;
      resize: none;
      font-size: 18px;
      width: 100%;
      height: 90px;
    }
  }
}
</style>
