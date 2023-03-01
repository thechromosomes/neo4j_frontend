export const state = () => ({
  // BASE_URL: "http://localhost:3000/api/",
  BASE_URL: "https://neo4j-backend.vercel.app/api/",
  pageLoader: false,
});

export const actions = {
  ApiCall(context, payload) {
    if (!payload.params.noLoader) {
      context.commit("updatePageLoader", { display: true });
    }
    var authOptions = {
      method: payload.method,
      url: context.state.BASE_URL + payload.url,
      headers: {
        "Content-Type": "application/json",
      },
      data: payload.params,
    };

    return new Promise((resolve, reject) => {
      this.$axios(authOptions)
        .then((response) => {
          context.commit("updatePageLoader", { display: false });
          resolve(response.data);
        })
        .catch((error) => {
          context.commit("updatePageLoader", { display: false });
          reject(error);
        });
    });
  },
};

export const mutations = {
  // update loader status
  updatePageLoader(state, { display }) {
    state.pageLoader = display;
  },
};
