<template>
  <div>
    <v-card class="elevation-12">
      <v-toolbar dark color="primary">
        <v-toolbar-title>My cars</v-toolbar-title>
      </v-toolbar>
        <v-list v-if="vehicles">
          <v-list-tile
            v-for="car in vehicles"
            :key="car.registrationNumber"
            avatar>
            <v-list-tile-action>
              <v-icon large light>directions_car</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title v-text="car.registrationNumber"></v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
        <v-card-title v-if="!vehicles.length">
          <span class="mb-2">You dont have any cars.</span>
        </v-card-title>
    </v-card>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
import gql from 'graphql-tag';

 export default {
  props: ['vehicles']
}
</script>