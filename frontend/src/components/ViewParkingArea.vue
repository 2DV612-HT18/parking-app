<template>
  <div>
    <v-content>
      <v-container>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>{{ this.parkingArea.name }}</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <!-- Show rates here with something smart -->
          </v-card-text>
        </v-card>
                    <router-link :to="{path: `/area/edit/${this.parkingArea.id}`}">
              <button id="editButton" class="foo bar">Edit</button>
            </router-link>
      </v-container>
    </v-content>
  </div>
</template>
<script>
import GetParkingArea from "@/graphql/GetParkingArea.gql";

export default {
  name: "ViewParkingArea",
  data: () => {
    return {
      parkingArea: {}
    };
  },
  apollo: {
    getParkingArea: {
      query: GetParkingArea,
      fetchPolicy: "no-cache",
      variables(){
        return {
          id: parseInt(this.$route.params.id)
        }
      },
      result(data) {
        this.parkingArea = data.data.getParkingArea;
      }
    }
  }
};
</script>