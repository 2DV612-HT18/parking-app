<template>
  <div>
    <v-card class="elevation-12">
        <v-toolbar dark color="primary">
            <v-toolbar-title>My parking areas</v-toolbar-title>
        </v-toolbar>

        <v-list v-if="areas">
        <v-list-tile v-for="areas in place" :key="areas.name" avatar>
          <v-list-tile-avatar>
            <v-icon large light>place</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>
              {{areas.name}}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

    </v-card>
</div>
</template>
  

<script>
    import GetParkingAreas from "@/graphql/GetParkingAreas.gql";

    export default {
    data: () => ({
        areas: []
        }),
        apollo: {
        GetParkingAreas: {
        query: GetParkingAreas,
        result(paData) {         
          this.areas = paData.paData.getParkingAreas;      
        }
      }
  },
  props: ["area"]
    };
</script>