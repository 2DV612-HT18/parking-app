<template>
  <div>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm12 md12 lg10 xl8>
            <v-snackbar
              v-model="failed"
              color="error"
              :top="true"
              :multi-line="true"
              >{{ failedMessage }}</v-snackbar
            >
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
                      <v-toolbar-title>Create new Parking Area</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                      <v-text-field
                        v-model="name"
                        :rules="nameRules"
                        label="Name"
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
                          <h1>Done!</h1>
                          <v-btn flat @click="stepBack">Back</v-btn>
                        </v-stepper-content>
                      </v-stepper-items>
                    </v-stepper>
                  </v-card>
                </v-flex>
              </v-layout>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn :to="{ name: 'ParkingAreas' }">Cancel</v-btn>
                <v-btn
                  color="primary"
                  v-on:click="addParkingArea();"
                  :disabled="!validForm || e1 < 4"
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
import addParkingArea from "@/graphql/AddParkingArea.gql";

export default {
  data: () => ({
    e1: 0,
    center: { lat: 59.334591, lng: 18.06324 },
    markers: [],
    validForm: false,
    name: "",
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
    failed: false,
    failedMessage: ""
  }),
  methods: {
    async addParkingArea() {
      const coordinates = this.coordinates.map(coordinate => {
        return {
          latitude: parseFloat(coordinate.latitude),
          longitude: parseFloat(coordinate.longitude)
        };
      });

      console.log(coordinates);

      const result = await this.$apollo.mutate({
        mutation: addParkingArea,
        variables: {
          name: this.name,
          coordinates
        }
      });

      const data = result.data.addParkingArea;

      console.log(data);

      if (data) {
        // Redirect to Parking Area list
        this.$router.push({ name: "ParkingAreas" });
      } else {
        // Display snackbar!
        this.failedMessage = "Creating new parking area was unsuccessful";
        this.failed = true;
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
      console.log("test");
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
    },
    geolocate() {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        // Update all coordinates
        this.coordinates.forEach(coordinate => {
          coordinate.latitude = position.coords.latitude;
          coordinate.longitude = position.coords.longitude;
        });
      });
    }
  },
  mounted() {
    this.geolocate();
  }
};
</script>
