<template>
  <div>
    <v-card class="elevation-12">
      <v-toolbar dark color="primary">
        <v-toolbar-title>My cars</v-toolbar-title>
      </v-toolbar>
      <v-list>
        <v-list-tile
          v-for="item in cars"
          :key="item.registrationNumber"
          avatar
          @click="">
            <v-list-tile-action>
              <v-icon large light>directions_car</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title v-text="item.registrationNumber"></v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
    </v-card>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
import gql from 'graphql-tag';

export default {
  data: () => ({
    cars: [{id: 0, registrationNumber: '123 abc' }]
  })
}
</script>
