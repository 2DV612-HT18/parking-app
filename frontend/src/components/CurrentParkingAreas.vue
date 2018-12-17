<template>
  <div>
    <v-card class="elevation-12">
      <v-toolbar dark color="primary">
        <v-toolbar-title>My active parking areas</v-toolbar-title>
      </v-toolbar>
      <v-list v-if="user.currentParkingAreas.length">
        <v-list-tile v-for="parkingArea in user.currentParkingAreas" :key="parkingArea.id" avatar>
          <v-list-tile-avatar>
            <v-icon large light>local_parking</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{parkingArea.name}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-card-title v-if="!user.currentParkingAreas.length">
        <span class="mb-2">You don't have any active parking areas</span>
      </v-card-title>
    </v-card>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "CurrentParkingAreas",
  computed: mapState(["user"])
};
</script>
