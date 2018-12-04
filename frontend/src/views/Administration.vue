<template>
  <div>
    <v-content>
      <v-container >
        <v-card class="elevation-12">
            <v-toolbar dark color="primary">
              <v-toolbar-title>Administration</v-toolbar-title>
            </v-toolbar>
            <div class="">
                Here comes administration content
            </div>

        </v-card>

      </v-container>
    </v-content>
  </div>
</template>

<script>

export default {

  components: {

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
