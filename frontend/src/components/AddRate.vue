<template>
  <div>
    <v-content>
      <v-container>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Add rate</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <!-- Create form for adding rate -->
            <!-- parking area id
              start time
              end time
              start date (optional)
              end date (optional)
              charge
              repeat (should choose in a list between values: NEVER, DAILY, WEEKLY, MONTHLY, YEARLY
              
              start/end time is to choose a time, verify that start time is before end time
              start/end date is only required if repeat is set to "NEVER" 
                + verify that start date is before end date
              charge is the amount paid per hour
              add component to parking area view
              make sure component is only seen by parking owners (a getter should be created in another task in store.js to check for this)
            -->
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
                    @change="$refs.startTimePicker.save(startTime); startEndDateValidation()"
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
                    @change="$refs.endTimePicker.save(endTime); startEndDateValidation();"
                  ></v-time-picker>
                </v-menu>
              </v-layout>
              <!-- End Time pickers -->
              <v-radio-group v-model="repeat" column label="Repeat">
                <v-radio 
                  v-for="interval in intervals" 
                  v-bind:key="interval.text" 
                  :label="interval.text" 
                  :value="interval.value" 
                ></v-radio>
              </v-radio-group>
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
                    :error-messages="endDateError"
                    @blur="startEndDateValidation()"
                  ></v-text-field>
                  <v-date-picker v-model="endDate" no-title scrollable></v-date-picker>
                </v-menu>
                <v-btn flat class="ma-auto ml-3" v-on:click="clearDates();"  color="primary">
                  Clear dates
                </v-btn>
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
      repeat: "DAILY",
      intervals: [
        {text: "Never", value: "NEVER"}, 
        {text: "Daily", value: "DAILY"}, 
        {text: "Weekly", value: "WEEKLY"}, 
        {text: "Monthly", value: "MONTHLY"}, 
        {text: "Yearly", value: "YEARLY"}
      ],
      chargeRule: [v => !!v || "Charge is required"],
      requiredRule: [v => !!v || "This is required"],
    }
  },
  watch: {
    startDate: function(){
      this.startEndDateValidation();
    },
    endDate: function(){
      this.startEndDateValidation();
    },
    repeat: function(){
      this.startEndDateValidation();
    }
  },
  methods: {
    clearDates(){
      this.startDate = "";
      this.endDate = "";
    },
    startEndDateValidation: function() {
      if((!this.endDate && this.repeat === "NEVER") || //if we dont have endDate and we must have endDate
      (!this.endDate && this.startDate)){//if we have startDate we also must have endDate
        this.endDateError = "End date is required";
      }else{
        this.endDateError = "";
      }
      if((!this.startDate && this.repeat === "NEVER") || //if we dont have startDate and we must have startDate
      (!this.startDate && this.endDate)){//if we have endDate we also must have startDate
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
      console.log("form validation: ", this.$refs.form.validate());
      console.log("start + end date validation: ", this.startEndDateValidation());
      if(this.$refs.form.validate() && this.startEndDateValidation()){
        //TODO: Fix so it doesnt submit if not all required fields are valid, required doesnt work on read only fields, so need to do it manually
        const result = await this.$apollo.mutate({
          mutation: AddParkingAreaRate,
          variables: {
            parkingAreaID: this.parkingAreaID,
            startTime: this.startTime,
            endTime: this.endTime,
            startDate: this.startDate,
            endDate: this.endDate,
            charge: this.charge,
            repeat: this.repeat
          }
        });
        const data = result.data.addRate;
        if (data) {
          // successful
          // Display snackbar! 
          this.success = true;
          console.log("successfull: ", data);
        } else {
          // unsuccessful
          // Display snackbar!
          this.failed = true
          console.log("unsuccessfull: ", data);
        }
      }
    }
  }
};
</script>