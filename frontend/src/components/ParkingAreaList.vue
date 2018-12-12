<template>
  <div>
    <v-card class="elevation-12">
      <v-list v-if="areas">
        <v-list-tile v-for="area in areas" :key="area.name" avatar :to="{path: `/area/${area.id}`}">
          <v-list-tile-avatar>
            <v-icon large light>local_parking</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{ area.name }}</v-list-tile-title>

            <router-link :to="{path: `/area/edit/${area.id}`}">
              <button id="myButton" class="foo bar">Go!</button>
            </router-link>

          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-card-title v-if="!areas.length">
        <span class="mb-2">You have no parking areas at the moment!</span>
      </v-card-title>
    </v-card>
  </div>
</template>

<script>
import GetParkingAreas from "@/graphql/GetParkingAreas.gql";

export default {
  data: () => {
    return {
      areas: []
    };
  },
  apollo: {
    getParkingAreas: {
      query: GetParkingAreas,
      fetchPolicy: "no-cache",
      result(data) {
        this.areas = data.data.getParkingAreas;
      }
    }
  }
};
</script>
