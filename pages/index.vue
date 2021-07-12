<template>
  <div class="home">
    <div class="home__title">Home</div>
    <div class="home__share">
      <Share @get_post="get_post()" />
    </div>
    <div class="home__posts">
      <div
        class="post"
        @click="$router.push('/comment/' + post.id)"
        v-for="(post, index) in posts"
        :key="index"
      >
        <div class="post__info post-info">
          <div class="post-info__people">{{ post.person.name }}</div>
          <div class="post-info__time">{{ formatTime(post.created_at) }}</div>
        </div>
        <div class="post__content">{{ post.content }}</div>
        <div class="post__actions post-action">
          <div class="post-action__heart" @click.stop="send_like(post.id)">
            <span v-if="!post.isLike">🤍</span>
            <span v-if="post.isLike">🧡</span>
            <span>{{ post.like_count }}</span>
          </div>
          <div class="post-action__cross"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import axios from "axios";

interface Post {
  id: number;
  person_id: string;
  content: string;
  created_at: string;
  update_at: string;
  like_count: number;
  person: string[];
}

@Component({
  layout: "nonHeader"
  // components: {
  // },
})
export default class Index extends Vue {
  private posts: Post[] = [];

  private formatTime(time: string): string {
    return time;
  }

  private async get_post(): Promise<void> {
    console.log("id  " + this.$store.state.userID);
    const posts = await axios.get(
      "http://127.0.0.1:8000/api/post?person_id=" + this.$store.state.userID
    );
    console.log(posts);
    this.posts = JSON.parse(JSON.stringify(posts.data.data));
    // console.log(this.posts[1].created_at > this.posts[2].created_at);
    this.posts.sort((a: Post, b: Post) =>
      a.created_at < b.created_at ? 1 : -1
    );
  }

  private async send_like(post_id: number): Promise<void> {
    const sendData = {
      person_id: this.$store.state.userID,
      post_id: post_id
    };
    const ret = await axios.post("http://127.0.0.1:8000/api/like", sendData);
    this.get_post();
  }

  created() {
    this.$store.dispatch(
      "call_set_userID",
      JSON.parse(localStorage["sns-app-key"]).userID
    );
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
    width: 40px;
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
  }
  &__heart {
    @extend %__post-action-item;
    cursor: pointer;
    & span {
      color: white;
      display: inline;
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
