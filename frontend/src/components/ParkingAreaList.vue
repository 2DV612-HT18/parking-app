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
          <v-list-tile-action v-if="userRole">
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
import store from "../store";

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
    userRole() {
      return this.$store.getters.userPermission;
    },
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
      this.addedActiveError = false;
      const result = await this.$apollo.mutate({
        mutation: ChooseParkingArea,
        variables: {
          parkingAreaID: parseInt(areaId)
        }
      }).then(result => {
        const data = result.data.chooseParkingArea;
        if (data) { //if data data != null then there has been an error
          //Something went wrong when adding parking area as active
          this.addedActiveError = true;
          this.addedActiveErrorMessage = data[0].message;
        } else {
          //Wihoo, I have added the parking area as active
          //Add to store (not needed right now so just add in this components data)
          this.activeParkingIds.push(areaId);
          //fix so the button becomes checkmarked... (just re render corresponding list item)
          this.$set(this.areas, index, this.areas[index]);
        }
      }).catch(error => {
        //catch general errors (like the permission check)
        console.log(error);
        this.addedActiveError = true;
        this.addedActiveErrorMessage = `${error}`;
      });
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
