<template>
  <div class="register">
    <div class="register-box">
      <div class="register-box__title">Register</div>
      <div class="register-box__input">
        <input
          v-model="name"
          type="type"
          placeholder="ユーザーネーム"
          required
        />
      </div>
      <div class="register-box__input">
        <input
          v-model="email"
          type="email"
          placeholder="メールアドレス"
          required
        />
      </div>
      <div class="register-box__input">
        <input
          v-model="password"
          type="password"
          placeholder="パスワード"
          required
        />
      </div>
      <div class="register-box__button" @click="register">新規登録</div>
    </div>
  </div>
</template>

<script>
// import { mapState } from "vuex/types/helpers";
import firebase from "~/plugins/firebase";
export default {
  data() {
    return {
      name: "",
      email: null,
      password: null
    };
  },
  methods: {
    register() {
      if (!this.email || !this.password) {
        alert("メールアドレスまたはパスワードが入力されていません。");
        return;
      }
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(data => {
          data.user.updateProfile({
            displayName: this.name
          });
          this.$store.dispatch("create_user", {
            userID: data.user.uid,
            name: this.name
          });
          // this.$store.dispatch("call_set_userID", data.user.uid);
          // console.log(data.user.uid);
          this.$router.replace("/");
        })
        .catch(error => {
          switch (error.code) {
            case "auth/invalid-email":
              alert("メールアドレスの形式が違います。");
              break;
            case "auth/email-already-in-use":
              alert("このメールアドレスはすでに使われています。");
              break;
            case "auth/weak-password":
              alert("パスワードは6文字以上で入力してください。");
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
.register {
  height: calc(100vh - 80px); //画面高さ - header高さ
  position: relative;
}
.register-box {
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
