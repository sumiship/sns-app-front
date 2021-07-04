<template>
  <div class="login">
    <div class="login-box">
      <div class="login-box__title">Login</div>
      <div class="login-box__input">
        <input
          v-model="email"
          type="email"
          placeholder="メールアドレス"
          required
        />
      </div>
      <div class="login-box__input">
        <input
          v-model="password"
          type="password"
          placeholder="パスワード"
          required
        />
      </div>
      <div class="login-box__button" @click="login">ログイン</div>
    </div>
  </div>
</template>

<script>
import firebase from "~/plugins/firebase";
export default {
  data() {
    return {
      email: null,
      password: null
    };
  },
  methods: {
    login() {
      if (!this.email || !this.password) {
        alert("メールアドレスまたはパスワードが入力されていません。");
        return;
      }
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          alert("ログインが完了しました");
          this.$router.push("/");
        })
        .catch(error => {
          switch (error.code) {
            case "auth/invalid-email":
              alert("メールアドレスの形式が違います。");
              break;
            case "auth/user-disabled":
              alert("ユーザーが無効になっています。");
              break;
            case "auth/user-not-found":
              alert("ユーザーが存在しません。");
              break;
            case "auth/wrong-password":
              alert("パスワードが間違っております。");
              break;
            default:
              alert("エラーが起きました。しばらくしてから再度お試しください。");
              break;
          }
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.login {
  height: calc(100vh - 80px); //画面高さ - header高さ
  position: relative;
}
.login-box {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  max-width: 500px;
  padding: 12px;
  background-color: white;
  border-radius: 14px;
  text-align: center;
  &__title {
    font-size: 20px;
    color: rgb(107, 106, 106);
    text-shadow: 0 0 1px pink;
    padding-bottom: 10px;
  }
  &__input {
    padding: 7px 0;
    & input {
      padding: 7px;
      border-radius: 7px;
      width: 80%;
      max-width: 290px;
      border-color: rgb(230, 100, 122);
      border-style: outset;
      &:focus {
        outline: none;
        box-shadow: 1px 1px 1px 1px rgb(167, 167, 167);
      }
    }
  }
  &__button {
    width: 70%;
    max-width: 200px;
    cursor: pointer;
    color: white;
    margin: 15px auto 0;
    padding: 7px 0;
    background-color: rgb(230, 100, 122);
    border-radius: 100px;
    border: outset 2px pink;
  }
}
</style>
