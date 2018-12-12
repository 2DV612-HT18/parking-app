<template>
  <div>
    <v-content>
      <v-container>
        <v-snackbar
          v-model="success"
          color="success"
          :top="true"
          :multi-line="true"                   
        >{{ successRate }}</v-snackbar>
        <v-snackbar
          v-model="failed"
          color="error"
          :top="true"
          :multi-line="true"                   
        >{{ failedRate }}</v-snackbar>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Add rate</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form v-model="validForm" ref="form">
            <!-- Start Time pickers -->
              <v-layout row wrap>
                <v-menu
                  class="mr-3"
                  ref="startTimePicker"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  :return-value.sync="startTime"
                  lazy
                  transition="scale-transition"
                  offset-y
                  full-width
                >
                  <v-text-field
                    slot="activator"
                    v-model="startTime"
                    label="Start time"
                    prepend-icon="access_time"
                    readonly
                    :error-messages="startTimeError"
                    :rules="requiredRule"
                    @blur="startEndTimeValidation();"
                  ></v-text-field>
                  <v-time-picker
                    v-model="startTime"
                    format="24hr"
                    full-width
                    @change="$refs.startTimePicker.save(startTime); startEndTimeValidation()"
                  ></v-time-picker>
                </v-menu>
                <v-menu
                  ref="endTimePicker"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  :return-value.sync="endTime"
                  transition="scale-transition"
                  offset-y
                  full-width
                >
                  <v-text-field
                    slot="activator"
                    v-model="endTime"
                    label="End time"
                    ref="endTime"
                    prepend-icon="access_time"
                    readonly
                    :error-messages="endTimeError"
                    :rules="requiredRule"
                    @blur="startEndTimeValidation();"
                  ></v-text-field>
                  <v-time-picker
                    v-model="endTime"
                    format="24hr"
                    full-width
                    @change="$refs.endTimePicker.save(endTime); startEndTimeValidation();"
                  ></v-time-picker>
                </v-menu>
              </v-layout>
              <!-- End Time pickers -->
              <!-- Date pickers -->
              <v-layout row wrap>
                <v-menu
                  class="mr-3"
                  ref="startDatePicker"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  full-width
                  min-width="290px"
                >
                  <v-text-field
                    slot="activator"
                    v-model="startDate"
                    label="Start date"
                    prepend-icon="event"
                    :error-messages="startDateError"
                    readonly
                    :rules="requiredRule"
                    @blur="startEndDateValidation()"
                  ></v-text-field>
                  <v-date-picker v-model="startDate" no-title scrollable></v-date-picker>
                </v-menu>
                <v-menu
                  ref="endDatePicker"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  full-width
                  min-width="290px"
                >
                  <v-text-field
                    slot="activator"
                    v-model="endDate"
                    label="End date"
                    prepend-icon="event"
                    readonly
                    :rules="requiredRule"
                    :error-messages="endDateError"
                    @blur="startEndDateValidation()"
                  ></v-text-field>
                  <v-date-picker v-model="endDate" no-title scrollable></v-date-picker>
                </v-menu>
              </v-layout>
              <!-- END Date pickers -->
              <v-text-field v-model="charge" type="number" :rules="chargeRule" label="Charge per hour" required></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" v-on:click="addRate();" :disabled="!validForm">Submit</v-btn>
          </v-card-actions>
        </v-card>
      </v-container>
    </v-content>
  </div>
</template>

<script>
import AddParkingAreaRate from "@/graphql/AddParkingAreaRate.gql";

export default {
  data: () => {
    return {
      validForm: false,
      startTime: "",
      startTimeError: "",
      endTime: "",
      endTimeError: "",
      startDate: "",
      endDate: "",
      endDateError: "",
      startDateError: "",
      charge: null,
      chargeRule: [v => !!v || "Charge is required"],
      requiredRule: [v => !!v || "This is required"],
      failedRate: "Couldnt add rate, make sure its not overlapping with any previous rates",
      successRate: "Added rate!",
      failed: "",
      success: ""
    }
  },
  watch: {
    startDate: function(){
      this.startEndDateValidation();
    },
    endDate: function(){
      this.startEndDateValidation();
    }
  },
  methods: {
    startEndDateValidation: function() {
      if(!this.endDate){//if we have startDate we also must have endDate
        this.endDateError = "End date is required";
      }else{
        this.endDateError = "";
      }
      if(!this.startDate){//if we have endDate we also must have startDate
        this.startDateError = "Start date is required";
      }else{
        this.startDateError = "";
      }
      if(this.endDateError || this.startDateError)
        return false;


      let startDate = Date.parse(this.startDate);
      let endDate = Date.parse(this.endDate);
      if (endDate < startDate) {
        this.endDateError = "End date is before start date";
        return false;
      }else{
        this.endDateError = "";
        return true;
      }
    },
    startEndTimeValidation: function() {
      if(!this.endTime){
        this.endTimeError = "End time is required";
      }else{
        this.endTimeError = "";
      }
      if(!this.startTime){
        this.startTimeError = "Start time is required";
      }else{
        this.startTimeError = "";
      }
      if(this.endTimeError || this.startTimeError)
        return;
      let startTime = new Date();
      startTime.setHours(this.startTime.split(":")[0]);
      startTime.setMinutes(this.startTime.split(":")[1]);
      let endTime = new Date();
      endTime.setHours(this.endTime.split(":")[0]);
      endTime.setMinutes(this.endTime.split(":")[1]);
      if (endTime < startTime) {
        this.endTimeError = "End time is before start time";
      }else{
        this.endTimeError = "";
      }
    },
    async addRate() {
      if(this.$refs.form.validate()){
        const result = await this.$apollo.mutate({
          mutation: AddParkingAreaRate,
          variables: {
            parkingAreaID: parseInt(this.$route.params.id),
            startTime: this.startTime,
            endTime: this.endTime,
            startDate: this.startDate,
            endDate: this.endDate,
            charge: parseFloat(this.charge)
          }
        });
        const data = result.data.addRate;
        if (data) {
          // successful
          // Display snackbar! 
          this.success = true;
        } else {
          // unsuccessful
          // ErrorMessage pls
          this.failed = true;
        }
      }
    }
  }
};
</script>