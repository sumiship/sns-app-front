<template>
  <div class="comment">
    <div class="loading" v-if="loading">
      <div class="loading__box"></div>
    </div>
    <div class="comment__title">comment</div>
    <div class="comment__post comment-post">
      <div class="comment-post__info comment-post-info">
        <div class="comment-post-info__people" v-if="!loading">
          {{ post.person.name }}
        </div>
        <div class="comment-post-info__time">{{ post.created_at }}</div>
      </div>
      <div class="comment-post__content">{{ post.content }}</div>
      <div class="comment-post__actions comment-post-action">
        <div
          class="comment-post-action__heart"
          @click.stop="send_like($route.params.id)"
        >
          <span v-if="!post.isLike">🤍</span>
          <span v-if="post.isLike">🧡</span>
          <span>{{ post.like_count }}</span>
        </div>
        <div class="comment-post-action__cross"></div>
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
  private post = [];
  private loading = true;

  private async get_post(): Promise<void> {
    const post = await axios.get(
      "http://127.0.0.1:8000/api/post/" +
        this.$route.params.id +
        "?person_id=" +
        this.$store.state.userID
    );
    this.loading = false;
    this.post = post.data;
    // this.post = JSON.parse(JSON.stringify(post.data));
    console.log(this.post);
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
.loading {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.192);
  &__box {
    color: #dba8c7;
    font-size: 40px;
    margin: 300px auto;
    width: 1em;
    height: 1em;
    border-radius: 50%;
    position: relative;
    text-indent: -9999em;
    -webkit-animation: load4 1.3s infinite linear;
    animation: load4 1.3s infinite linear;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
  }
}
@-webkit-keyframes load4 {
  0%,
  100% {
    box-shadow: 0 -3em 0 0.2em, 2em -2em 0 0em, 3em 0 0 -1em, 2em 2em 0 -1em,
      0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 0;
  }
  12.5% {
    box-shadow: 0 -3em 0 0, 2em -2em 0 0.2em, 3em 0 0 0, 2em 2em 0 -1em,
      0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em;
  }
  25% {
    box-shadow: 0 -3em 0 -0.5em, 2em -2em 0 0, 3em 0 0 0.2em, 2em 2em 0 0,
      0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em;
  }
  37.5% {
    box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 0, 2em 2em 0 0.2em,
      0 3em 0 0em, -2em 2em 0 -1em, -3em 0em 0 -1em, -2em -2em 0 -1em;
  }
  50% {
    box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 0em,
      0 3em 0 0.2em, -2em 2em 0 0, -3em 0em 0 -1em, -2em -2em 0 -1em;
  }
  62.5% {
    box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em,
      0 3em 0 0, -2em 2em 0 0.2em, -3em 0 0 0, -2em -2em 0 -1em;
  }
  75% {
    box-shadow: 0em -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 -1em, 2em 2em 0 -1em,
      0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0.2em, -2em -2em 0 0;
  }
  87.5% {
    box-shadow: 0em -3em 0 0, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em,
      0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0, -2em -2em 0 0.2em;
  }
}
@keyframes load4 {
  0%,
  100% {
    box-shadow: 0 -3em 0 0.2em, 2em -2em 0 0em, 3em 0 0 -1em, 2em 2em 0 -1em,
      0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 0;
  }
  12.5% {
    box-shadow: 0 -3em 0 0, 2em -2em 0 0.2em, 3em 0 0 0, 2em 2em 0 -1em,
      0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em;
  }
  25% {
    box-shadow: 0 -3em 0 -0.5em, 2em -2em 0 0, 3em 0 0 0.2em, 2em 2em 0 0,
      0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em;
  }
  37.5% {
    box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 0, 2em 2em 0 0.2em,
      0 3em 0 0em, -2em 2em 0 -1em, -3em 0em 0 -1em, -2em -2em 0 -1em;
  }
  50% {
    box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 0em,
      0 3em 0 0.2em, -2em 2em 0 0, -3em 0em 0 -1em, -2em -2em 0 -1em;
  }
  62.5% {
    box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em,
      0 3em 0 0, -2em 2em 0 0.2em, -3em 0 0 0, -2em -2em 0 -1em;
  }
  75% {
    box-shadow: 0em -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 -1em, 2em 2em 0 -1em,
      0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0.2em, -2em -2em 0 0;
  }
  87.5% {
    box-shadow: 0em -3em 0 0, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em,
      0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0, -2em -2em 0 0.2em;
  }
}

.comment {
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

.comment-post {
  border-bottom: 1px solid white;
  padding: 10px;
  &__actions {
    width: 50%;
  }
}
.comment-post-info {
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
.comment-post-action {
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
      display: inline-block;
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
