<template>
  <div>
    <v-snackbar
      v-model="addedActiveError"
      color="error"
      :top="true"
      :multi-line="true"
    >
      {{addedActiveErrorMessage}}
    </v-snackbar>
    <v-card class="elevation-12">
      <v-list v-if="areas">
        <v-list-tile
          v-for="(area, index) in areas"
          :key="area.name"
          avatar
          :title="'Open parking '+ area.name"
          tabindex="0"
          @click="$router.push({ path: `/area/${area.id}` })"
        >
          <v-list-tile-avatar>
            <v-icon large light>local_parking</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{ area.name }}</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-icon
              v-if="activeParkingIds.indexOf(area.id) > -1"
              icon
              title="Active parking area"
              color="green">
              done
            </v-icon>
            <v-btn
              v-else
              icon
              title="Add as active parking area"
              v-on:click.stop="chooseArea(area.id, index);">
              <v-icon>add</v-icon>
            </v-btn>
          </v-list-tile-action>
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
import ChooseParkingArea from "@/graphql/ChooseParkingArea.gql";
import { mapState } from "vuex";
import _ from "underscore";

export default {
  data: () => {
    return {
      areas: [],
      addedActiveError: false,
      addedActiveErrorMessage: ""
    };
  },
  computed: {
    ...mapState(["user"]),
    activeParkingIds: function() {
      let activeParkingIds = [];
      _.each(this.user.currentParkingAreas, (activeParkingArea) =>{
        activeParkingIds.push(`${activeParkingArea.id}`);
      });
      return activeParkingIds;
    }
  },
  methods: {
    async chooseArea(areaId, index) {
      const result = await this.$apollo.mutate({
        mutation: ChooseParkingArea,
        variables: {
          parkingAreaID: areaId
        }
      });
      const data = result.data.chooseParkingArea;
      this.addedActiveError = false;
      if (data === null) {
        //Wihoo, I have added the parking area as active
        //Add to store, but for now it doesnt matter.
        this.activeParkingIds.push(areaId);
        //fix so the button becomes checkmarked... (just re render corresponding list item)
        this.$set(this.areas, index, this.areas[index]);
      } else {
        //Something went wrong when adding parking area as active
        this.addedActiveError = true;
        this.addedActiveErrorMessage = data;
      }
    }
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
