<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <router-link class="logo" to="/">
          <span>PARKER</span>
          <span class="font-weight-light"> PARKING APP</span>
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <logout/>
    </v-toolbar>

    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import Logout from "@/components/Logout";

export default {
  name: "App",
  components: {
    Logout
  },
  data() {
    return {
      //
    };
  }
};
</script>

<style>
a.logo {
  color: inherit;
  text-decoration: inherit;
}
</style>
