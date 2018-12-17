<template>
  <div>
    <v-content>
      <v-container>
        <CurrentParkingAreas v-if="user"/>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Profile</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <div v-if="user">
              Email: {{ user.email }} - Role: {{ user.roles[0].name }}
            </div>
          </v-card-text>

          <v-btn round to="/admin" outline color="green" v-if="admin"
            >Admin</v-btn
          >
          <v-btn round to="/area" outline color="green">Parking Area</v-btn>
          <v-btn round to="/closeaccount" outline color="green"
            >Delete your account</v-btn
          >
        </v-card>
        <MyVehicles v-if="user" :vehicles="user.vehicles" />
        <AddVehicle />
      </v-container>
    </v-content>
  </div>
</template>

<script>
import { mapState } from "vuex";

import AddVehicle from "@/components/AddVehicle.vue";
import MyVehicles from "@/components/MyVehicles.vue";
import CurrentParkingAreas from "@/components/CurrentParkingAreas.vue";

export default {
  data() {
    return {
      items: [{ title: "Photos" }]
    };
  },
  computed: {
    ...mapState(["user"]),
    admin() {
      return this.$store.getters.adminPermission;
    }
  },
  components: {
    AddVehicle,
    MyVehicles,
    CurrentParkingAreas
  }
};
</script>
