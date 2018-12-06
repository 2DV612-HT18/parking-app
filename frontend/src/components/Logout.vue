<template>
  <v-btn flat @click="logout" v-if="user">
    <span class="mr-2">Log out</span>
  </v-btn>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { onLogout } from "@/vue-apollo";
import LogoutUser from "@/graphql/LogoutUser.gql";

export default {
  name: "Logout",
  computed: mapState(["user"]),
  methods: {
    ...mapMutations(["setUser"]),
    async logout() {
      const result = await this.$apollo.mutate({
        mutation: LogoutUser
      });

      const data = result.data.logoutUser;

      // Token exists
      if (data) {
        const apolloClient = this.$apollo.provider.defaultClient;
        // Sets token in localhost
        await onLogout(apolloClient);
        await this.setUser(null);

        // Redirect to homepage
        this.$router.push("/");
      } else {
        // Logout unsuccessful
      }
    }
  }
};
</script>

<style></style>
