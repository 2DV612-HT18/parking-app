<template>
  <div>
    <v-content>
      <v-container>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>{{ this.parkingArea.name }}</v-toolbar-title>
          </v-toolbar>
          <ViewRates :rates="parkingArea.rates"/>
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
import ViewRates from "@/components/ViewRates.vue";

export default {
  name: "ViewParkingArea",
  components: {
    ViewRates
  },
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