<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <router-link class="logo" to="/">
          <span>PARKER</span> <span class="font-weight-light">PARKING APP</span>
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <logout />
    </v-toolbar>
    <v-content>
      <Notifications v-if="user" />
      <ParkingNotification v-if="user" />
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import Logout from "@/components/Logout";
import Notifications from "@/components/Notifications.vue";
import ParkingNotification from "@/components/ParkingNotification.vue";
import { mapState } from "vuex";

export default {
  name: "App",
  components: {
    Logout,
    Notifications,
    ParkingNotification
  },
  computed: mapState(["user"]),
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
