<template>
  <div class="index">
    <div class="home">
      <div class="home__title">Home</div>
      <div class="home__share">
        <Share @get_post="get_post()" />
      </div>
      <div class="home__posts">
        <div
          class="post"
          @click="test(index)"
          v-for="(post, index) in posts"
          :key="index"
        >
          <div class="post__info post-info">
            <div class="post-info__people">{{ post.person_name }}</div>
            <div class="post-info__time">{{ post.created_at }}</div>
          </div>
          <div class="post__content">{{ post.content }}</div>
          <div class="post__actions post-action">
            <div class="post-action__heart" @click.stop="send_like(index + 1)">
              <span>{{ post.like_count }}</span>
            </div>
            <div class="post-action__cross"></div>
          </div>
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

  private async send_like(post_id: number): Promise<void> {
    const sendData = {
      person_id: this.$store.state.userID,
      post_id: post_id
    };
    const ret = await axios.post("http://127.0.0.1:8000/api/like", sendData);
    this.get_post();
  }

  private test(num: string): void {
    console.log(num);
  }
  private test2(): void {
    console.log("aaaaaaaaaaaaaa");
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
  // &__posts {
  //   height: 2000px;
  // }
}
@media screen and (max-width: 700px) {
  .home {
    border: none;
  }
}

.post {
  border-bottom: 1px solid white;
  padding: 10px;
  &__actions {
    width: 50%;
  }
}
.post-info {
  display: flex;
  align-items: center;
  &__people {
    font-size: 24px;
  }
  &__time {
    font-size: 18px;
    color: rgb(77, 75, 75);
  }
}
.post-action {
  display: flex;
  justify-content: space-around;
  height: 20px;
  %__post-action-item {
    width: 20px;
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
  }
  &__heart {
    background: url("~/assets/img/heart.png");
    @extend %__post-action-item;
    cursor: pointer;
    & span {
      color: white;
      display: inline-block;
      padding-left: 30px;
      transform: translateY(-2px);
    }
  }
  &__cross {
    background: url("~/assets/img/cross.png");
    @extend %__post-action-item;
    cursor: pointer;
  }
}
</style>
