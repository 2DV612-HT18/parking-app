<template>
  <div>
    <v-snackbar
      v-model="failed"
      color="error"
      icon="warning"
      :top="true"
      :multi-line="true"
      >{{ error_message
      }}<v-btn dark flat @click="failed = false;"> Close </v-btn>
    </v-snackbar>
    <v-snackbar v-model="success" color="success" :top="true" :multi-line="true"
      >{{ success_message }}
      <v-btn dark flat @click="success = false;"> Close </v-btn>
    </v-snackbar>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm12 md12 lg10 xl8>
            <v-form v-model="validForm">
              <v-layout row wrap>
                <v-flex xs12 sm12 md4>
                  <v-card style="width:100%;  height: 100%; min-height: 300px;">
                    <googlemaps-map
                      :center="center"
                      :zoom="12"
                      style="width:100%;  height: 100%; min-height: 300px;"
                    >
                      <googlemaps-marker
                        :key="index"
                        v-for="(m, index) in markers"
                        :position="m.position"
                        @click="center = m.position;"
                      />
                    </googlemaps-map>
                  </v-card>
                </v-flex>
                <v-flex xs12 sm12 md8>
                  <v-card class="elevation-12">
                    <v-toolbar dark color="primary">
                      <v-toolbar-title>Edit Parking Area</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                      <v-text-field
                        v-model="nameArea"
                        :rules="nameRules"
                        label="Name"
                        value
                        required
                      ></v-text-field>
                    </v-card-text>
                    <v-stepper v-model="e1">
                      <v-stepper-header>
                        <v-stepper-step :complete="e1 > 1" step="1"
                          >Top Left</v-stepper-step
                        >

                        <v-divider></v-divider>

                        <v-stepper-step :complete="e1 > 2" step="2"
                          >Top Right</v-stepper-step
                        >

                        <v-divider></v-divider>

                        <v-stepper-step :complete="e1 > 3" step="3"
                          >Bottom Left</v-stepper-step
                        >

                        <v-divider></v-divider>

                        <v-stepper-step :complete="e1 > 4" step="4"
                          >Bottom Right</v-stepper-step
                        >

                        <v-divider></v-divider>

                        <v-stepper-step step="5">Done!</v-stepper-step>
                      </v-stepper-header>

                      <v-stepper-items>
                        <v-stepper-content step="1">
                          <v-subheader style="padding: 0; margin-bottom: 20px;">
                            <v-icon>location_on</v-icon>Top Left Coordinate
                          </v-subheader>
                          <v-layout row wrap>
                            <v-flex xs6 sm6 md6>
                              <v-text-field
                                type="number"
                                step=".000000"
                                v-model="coordinates[0].latitude"
                                label="Latitude"
                                required
                              ></v-text-field>
                            </v-flex>
                            <v-flex xs6 sm6 md6>
                              <v-text-field
                                type="number"
                                step=".000000"
                                v-model="coordinates[0].longitude"
                                label="Longitude"
                                required
                              ></v-text-field>
                            </v-flex>
                          </v-layout>

                          <v-btn color="primary" @click="firstStep"
                            >Continue</v-btn
                          >
                        </v-stepper-content>

                        <v-stepper-content step="2">
                          <v-subheader style="padding: 0; margin-bottom: 20px;">
                            <v-icon>location_on</v-icon>Top Right Coordinate
                          </v-subheader>
                          <v-layout row wrap>
                            <v-flex xs6 sm6 md6>
                              <v-text-field
                                type="number"
                                step=".000000"
                                v-model="coordinates[1].latitude"
                                label="Latitude"
                                required
                              ></v-text-field>
                            </v-flex>
                            <v-flex xs6 sm6 md6>
                              <v-text-field
                                type="number"
                                step=".000000"
                                v-model="coordinates[1].longitude"
                                label="Longitude"
                                required
                              ></v-text-field>
                            </v-flex>
                          </v-layout>

                          <v-btn color="primary" @click="secondStep"
                            >Continue</v-btn
                          >

                          <v-btn flat @click="stepBack">Back</v-btn>
                        </v-stepper-content>

                        <v-stepper-content step="3">
                          <v-subheader style="padding: 0; margin-bottom: 20px;">
                            <v-icon>location_on</v-icon>Bottom Left Coordinate
                          </v-subheader>
                          <v-layout row wrap>
                            <v-flex xs6 sm6 md6>
                              <v-text-field
                                type="number"
                                step=".000000"
                                v-model="coordinates[2].latitude"
                                label="Latitude"
                                required
                              ></v-text-field>
                            </v-flex>
                            <v-flex xs6 sm6 md6>
                              <v-text-field
                                type="number"
                                step=".000000"
                                v-model="coordinates[2].longitude"
                                label="Longitude"
                                required
                              ></v-text-field>
                            </v-flex>
                          </v-layout>

                          <v-btn color="primary" @click="thirdStep"
                            >Continue</v-btn
                          >

                          <v-btn flat @click="stepBack">Back</v-btn>
                        </v-stepper-content>

                        <v-stepper-content step="4">
                          <v-subheader style="padding: 0; margin-bottom: 20px;">
                            <v-icon>location_on</v-icon>Bottom Right Coordinate
                          </v-subheader>
                          <v-layout row wrap>
                            <v-flex xs6 sm6 md6>
                              <v-text-field
                                type="number"
                                step=".000000"
                                v-model="coordinates[3].latitude"
                                label="Latitude"
                                required
                              ></v-text-field>
                            </v-flex>
                            <v-flex xs6 sm6 md6>
                              <v-text-field
                                type="number"
                                step=".000000"
                                v-model="coordinates[3].longitude"
                                label="Longitude"
                                required
                              ></v-text-field>
                            </v-flex>
                          </v-layout>

                          <v-btn color="primary" @click="fourthStep"
                            >Continue</v-btn
                          >

                          <v-btn flat @click="stepBack">Back</v-btn>
                        </v-stepper-content>
                        <v-stepper-content step="5">
                          <div style="min-height: 100px; padding: 30px;">
                            <h3 class="display-2">
                              <v-icon
                                x-large
                                color="green accent-3"
                                style="display: inline-flex; vertical-align: middle; margin-right: 10px;"
                                >done</v-icon
                              >Done!
                            </h3>
                            <v-subheader>
                              Please verify that the coordinates are correct
                              before submitting.
                            </v-subheader>
                          </div>
                          <v-btn flat @click="stepBack">Back</v-btn>
                        </v-stepper-content>
                      </v-stepper-items>
                    </v-stepper>
                  </v-card>
                </v-flex>
              </v-layout>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  :to="{
                    name: 'ViewParkingArea',
                    params: { id: this.parkingArea.id }
                  }"
                  >Cancel</v-btn
                >
                <v-btn
                  color="primary"
                  v-on:click="editParkingArea();"
                  :disabled="!validForm || e1 < 5"
                  >Submit</v-btn
                >
              </v-card-actions>
            </v-form>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </div>
</template>

<script>
const EditParkingArea = require("@/graphql/EditParkingArea.gql");
import GetParkingArea from "@/graphql/GetParkingArea.gql";

export default {
  props: ["form_title", "mutationName", "success_message", "failed_message"],
  data: () => ({
    nameArea: "",
    parkingArea: {},
    e1: 0,
    center: { lat: 59.334591, lng: 18.06324 },
    markers: [],
    validForm: false,
    nameRules: [v => !!v || "Name is required"],
    coordinates: [
      {
        latitude: "0.000000",
        longitude: "0.000000"
      },
      {
        latitude: "0.000000",
        longitude: "0.000000"
      },
      {
        latitude: "0.000000",
        longitude: "0.000000"
      },
      {
        latitude: "0.000000",
        longitude: "0.000000"
      }
    ],
    success: false,
    failed: false,
    error_message: null,
    success_message: null
  }),
  apollo: {
    getParkingArea: {
      query: GetParkingArea,
      fetchPolicy: "no-cache",
      variables() {
        return {
          id: parseInt(this.$route.params.id)
        };
      },
      result(data) {
        this.parkingArea = data.data.getParkingArea;
        this.nameArea = this.parkingArea.name;
        this.coordinates = this.parkingArea.coordinates;

        console.log(this.parkingArea);

        // Sort coordinates by id
        this.coordinates.sort((a, b) => {
          return a.id - b.id;
        });
      }
    }
  },
  methods: {
    async editParkingArea() {
      const coordinates = this.coordinates.map(coordinate => {
        return {
          id: coordinate.id,
          latitude: parseFloat(coordinate.latitude),
          longitude: parseFloat(coordinate.longitude)
        };
      });

      const result = await this.$apollo.mutate({
        mutation: EditParkingArea,
        variables: {
          id: parseInt(this.$route.params.id),
          name: this.nameArea,
          coordinates
        }
      });

      const data = result.data.editParkingArea;

      if (data) {
        // Display snackbar and error message
        this.failed = true;
        this.error_message = data[0].message;
      } else {
        this.success = true;
        this.success_message = "Edit successful.";
        this.$router.push({ name: "ParkingAreas" });
      }
    },
    addMarker(latitude, longitude) {
      const marker = {
        lat: parseFloat(latitude),
        lng: parseFloat(longitude)
      };
      this.markers.push({ position: marker });
      this.center = marker;
    },
    stepBack() {
      this.e1 = this.e1 - 1;

      // Remove last marker
      if (this.markers.length > 0) {
        this.markers.shift();
      }
    },
    firstStep() {
      this.addMarker(
        this.coordinates[0].latitude,
        this.coordinates[0].longitude
      );
      this.e1 = 2;
    },
    secondStep() {
      this.addMarker(
        this.coordinates[1].latitude,
        this.coordinates[1].longitude
      );
      this.e1 = 3;
    },
    thirdStep() {
      this.addMarker(
        this.coordinates[2].latitude,
        this.coordinates[2].longitude
      );
      this.e1 = 4;
    },
    fourthStep() {
      this.addMarker(
        this.coordinates[3].latitude,
        this.coordinates[3].longitude
      );
      this.e1 = 5;
    }
  }
};
</script>
