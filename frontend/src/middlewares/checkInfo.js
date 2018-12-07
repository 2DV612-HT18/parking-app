import { apolloProvider } from "../vue-apollo";
import myInfo from "../graphql/MyInfo.gql";
import store from "../store";

export default async ({ next }) => {
  try {
    const data = await apolloProvider.defaultClient.query({
      query: myInfo
    });

    const user = data.data.myInfo;

    // Save in store
    store.commit("setUser", user);
  } catch (error) {
    // Remove user from store
    store.commit("setUser", null);
  }

  return next();
};
