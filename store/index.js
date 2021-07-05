import axios from "axios";

export const state = () => ({
  userID: ""
});
export const mutations = {
  set_userID(state, payload) {
    state.userID = payload;
  }
};
export const actions = {
  async create_user(context, data) {
    await axios.post("http://127.0.0.1:8000/api/person", data);
    context.dispatch("call_set_userID", data.userID);
  },
  call_set_userID(context, userID) {
    context.commit("set_userID", userID);
  }
};
