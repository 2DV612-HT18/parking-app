<template>
  <div>
    <h1>Members area</h1>
    <div v-if="user">Email: {{ user.email }}</div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

import MyInfo from "@/graphql/MyInfo.gql";
import { onLogout } from "@/vue-apollo";

export default {
  computed: mapState(["user"]),
  methods: {
    ...mapMutations(["setUser"])
  },
  apollo: {
    myInfo: {
      // TODO: Use router middleware instead
      query: MyInfo,
      result(data) {
        const user = data.data.myInfo;
        // Update store
        this.setUser(user);

        // Log out user if we can't get user
        if (!user) {
          const apolloClient = this.$apollo.provider.defaultClient;
          onLogout(apolloClient);
          this.$router.push("/login");
        }
      }
    }
  }
};
</script>
