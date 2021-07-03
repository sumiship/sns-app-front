<template>
  <div class="register">
    <div class="register-box">
      <div class="register-box__title">新規登録</div>
      <div class="register-box__">
        <input
          v-model="name"
          type="type"
          placeholder="ユーザーネーム"
          required
        />
      </div>
      <div class="register-box__">
        <input
          v-model="email"
          type="email"
          placeholder="メールアドレス"
          required
        />
      </div>
      <div class="register-box__">
        <input
          v-model="password"
          type="password"
          placeholder="パスワード"
          required
        />
      </div>
      <div class="register-box__" @click="register">新規登録</div>
    </div>
  </div>
</template>

<script>
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
          console.log(data.user);
          this.$router.replace("/confirm");
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
