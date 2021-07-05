<template>
  <div class="index">
    <div class="home">
      <div class="home__title">Home</div>
      <div class="home__share">
        <Share />
      </div>
      <div class="home__posts">
        <div class="post" v-for="(post, index) in posts" :key="index">
          <div class="post__people">{{ post.person_id }}</div>
          <div class="post__content">{{ post.content }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import axios from "axios";

@Component({
  layout: "nonHeader"
  // components: {
  // },
})
export default class Index extends Vue {
  private posts = [];

  private async get_post(): Promise<void> {
    const posts = await axios.get("http://127.0.0.1:8000/api/post");
    this.posts = JSON.parse(JSON.stringify(posts.data.data));
  }

  mounted() {
    this.get_post();
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
</style>
