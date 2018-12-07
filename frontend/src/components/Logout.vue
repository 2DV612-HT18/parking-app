<template>
  <v-btn flat @click="logout" v-if="user">
    <span class="mr-2">Log out</span>
  </v-btn>
</template>

<script>
import { mapState } from "vuex";
import { onLogout } from "@/vue-apollo";
import LogoutUser from "@/graphql/LogoutUser.gql";

export default {
  name: "Logout",
  computed: mapState(["user"]),
  methods: {
    async logout() {
      await this.$apollo.mutate({
        mutation: LogoutUser
      });

      const apolloClient = this.$apollo.provider.defaultClient;
      // Sets token in localhost
      await onLogout(apolloClient);

      // Reload current page
      this.$router.go(0);
    }
  }
};
</script>

<style></style>
