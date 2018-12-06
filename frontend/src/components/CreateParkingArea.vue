<template>
  <div>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm12 md9 lg8>
            <v-snackbar
              v-model="failed"
              color="error"
              :top="true"
              :multi-line="true"
              >{{ failedMessage }}</v-snackbar
            >
            <v-form v-model="validForm">
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

                    <v-stepper-step step="4">Bottom Right</v-stepper-step>
                  </v-stepper-header>

                  <v-stepper-items>
                    <v-stepper-content step="1">
                      <v-subheader style="padding: 0; margin-bottom: 20px;">
                        <v-icon>location_on</v-icon>Top Left Coordinate
                      </v-subheader>
                      <v-layout row wrap>
                        <v-flex xs6 sm6 md6>
                          <v-text-field
                            v-model="topLeftCoordinate.latitude"
                            label="Latitude"
                            required
                            :mask="coordinateMask"
                          ></v-text-field>
                        </v-flex>
                        <v-flex xs6 sm6 md6>
                          <v-text-field
                            v-model="topLeftCoordinate.longitude"
                            label="Longitude"
                            required
                          ></v-text-field>
                        </v-flex>
                      </v-layout>

                      <v-btn color="primary" @click="e1 = 2;">Continue</v-btn>

                      <v-btn flat @click="e1 = 1;">Start over</v-btn>
                    </v-stepper-content>

                    <v-stepper-content step="2">
                      <v-subheader style="padding: 0; margin-bottom: 20px;">
                        <v-icon>location_on</v-icon>Top Right Coordinate
                      </v-subheader>
                      <v-layout row wrap>
                        <v-flex xs6 sm6 md6>
                          <v-text-field
                            v-model="topRightCoordinate.latitude"
                            label="Latitude"
                            required
                            :mask="coordinateMask"
                          ></v-text-field>
                        </v-flex>
                        <v-flex xs6 sm6 md6>
                          <v-text-field
                            v-model="topRightCoordinate.longitude"
                            label="Longitude"
                            required
                          ></v-text-field>
                        </v-flex>
                      </v-layout>

                      <v-btn color="primary" @click="e1 = 3;">Continue</v-btn>

                      <v-btn flat @click="e1 = 1;">Start over</v-btn>
                    </v-stepper-content>

                    <v-stepper-content step="3">
                      <v-subheader style="padding: 0; margin-bottom: 20px;">
                        <v-icon>location_on</v-icon>Bottom Left Coordinate
                      </v-subheader>
                      <v-layout row wrap>
                        <v-flex xs6 sm6 md6>
                          <v-text-field
                            v-model="bottomLeftCoordinate.latitude"
                            label="Latitude"
                            required
                            :mask="coordinateMask"
                          ></v-text-field>
                        </v-flex>
                        <v-flex xs6 sm6 md6>
                          <v-text-field
                            v-model="bottomLeftCoordinate.longitude"
                            label="Longitude"
                            required
                          ></v-text-field>
                        </v-flex>
                      </v-layout>

                      <v-btn color="primary" @click="e1 = 4;">Continue</v-btn>

                      <v-btn flat @click="e1 = 1;">Start over</v-btn>
                    </v-stepper-content>

                    <v-stepper-content step="4">
                      <v-subheader style="padding: 0; margin-bottom: 20px;">
                        <v-icon>location_on</v-icon>Bottom Right Coordinate
                      </v-subheader>
                      <v-layout row wrap>
                        <v-flex xs6 sm6 md6>
                          <v-text-field
                            v-model="bottomRightCoordinate.latitude"
                            label="Latitude"
                            required
                            :mask="coordinateMask"
                          ></v-text-field>
                        </v-flex>
                        <v-flex xs6 sm6 md6>
                          <v-text-field
                            v-model="bottomRightCoordinate.longitude"
                            label="Longitude"
                            required
                          ></v-text-field>
                        </v-flex>
                      </v-layout>

                      <v-btn flat @click="e1 = 1;">Start over</v-btn>
                    </v-stepper-content>
                  </v-stepper-items>
                </v-stepper>
              </v-card>
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
    validForm: false,
    coordinateMask: "#.######",
    name: "",
    nameRules: [v => !!v || "Name is required"],
    topLeftCoordinate: {
      latitude: "0.000000",
      longitude: "0.000000"
    },
    topRightCoordinate: {
      latitude: "0.000000",
      longitude: "0.000000"
    },
    bottomLeftCoordinate: {
      latitude: "0.000000",
      longitude: "0.000000"
    },
    bottomRightCoordinate: {
      latitude: "0.000000",
      longitude: "0.000000"
    },
    failed: false,
    failedMessage: ""
  }),
  methods: {
    async addParkingArea() {
      const coordinates = [
        {
          latitude: parseFloat(this.topLeftCoordinate.latitude),
          longitude: parseFloat(this.topLeftCoordinate.longitude)
        },
        {
          latitude: parseFloat(this.topRightCoordinate.latitude),
          longitude: parseFloat(this.topRightCoordinate.longitude)
        },
        {
          latitude: parseFloat(this.bottomLeftCoordinate.latitude),
          longitude: parseFloat(this.bottomLeftCoordinate.longitude)
        },
        {
          latitude: parseFloat(this.bottomRightCoordinate.latitude),
          longitude: parseFloat(this.bottomRightCoordinate.longitude)
        }
      ];

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
    }
  }
};
</script>
