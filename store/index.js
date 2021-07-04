export const state = () => ({
  userID: ""
});
export const mutations = {
  set_userID(state, payload) {
    state.userID = payload;
  }
};
export const actions = {
  call_set_userID(context, userID) {
    context.commit("set_userID", userID);
  }
};
