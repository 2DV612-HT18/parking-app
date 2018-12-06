<template>
  <div>
    <v-content>
      <v-container >
        <v-card class="elevation-12">
            <v-toolbar dark color="primary">
              <v-toolbar-title>Profile</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <div v-if="user">Email: {{ user.email }} - Role: {{ user.roles[0].name }}</div>
            </v-card-text>
            
            <v-btn round to="/area" outline color="green">
          Parking Area
        </v-btn>
        </v-card>
        <MyVehicles v-if="user" :vehicles="user.vehicles"/>
        <AddVehicle/>
      </v-container>
    </v-content>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

import MyInfo from "@/graphql/MyInfo.gql";
import AddVehicle from "@/components/AddVehicle.vue";
import MyVehicles from "@/components/MyVehicles.vue";
import { onLogout } from "@/vue-apollo";

export default {
  computed: mapState(["user"]),
  methods: {
    ...mapMutations(["setUser"])
  },
  components: {
    AddVehicle,
    MyVehicles
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
  },
};
</script>
