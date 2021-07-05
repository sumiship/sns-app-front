<template>
  <div class="share-box">
    <div class="share-box__input">
      <textarea
        id="textarea"
        v-model="content"
        rows="1"
        placeholder="今何してる？"
        @input="areaFlex()"
      ></textarea>
    </div>
    <div class="share-box__button" @click="create_post()">share</div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import axios from "axios";

@Component({})
export default class Share extends Vue {
  private content = "";

  private async create_post(): Promise<void> {
    const sendData = {
      person_id: this.$store.state.userID,
      content: this.content
    };
    await axios.post("http://127.0.0.1:8000/api/post", sendData);
  }

  private areaFlex(): void {
    let textarea = document.getElementById("textarea")!;
    let clientHeight = textarea.clientHeight;
    textarea.style.height = clientHeight + "px";
    let scrollHeight = textarea.scrollHeight;
    textarea.style.height = scrollHeight + "px";
  }
}
</script>
<style lang="scss" scoped>
.share-box {
  border-bottom: 35px solid rgb(175, 102, 114);
}
.share-box {
  &__input {
    & textarea {
      background-color: rgb(221, 154, 159);
      border: none;
      resize: none;
      font-size: 28px;
      width: 100%;
      margin-bottom: 20px;
      &:focus {
        outline: none;
      }
    }
  }
  &__button {
    width: 130px;
    background-color: pink;
    margin: 0 10px 10px auto;
    border-radius: 100px;
    padding: 2px 0;
    text-align: center;
    color: white;
    font-size: 30px;
    cursor: pointer;
  }
}
</style>
