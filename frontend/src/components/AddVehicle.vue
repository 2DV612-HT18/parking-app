<template>
  <div>
    <v-card class="elevation-12">
      <v-toolbar dark color="primary">
        <v-toolbar-title>Add car</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-form v-model="validForm">
          <v-text-field
            v-model="registrationNumber"
            :rules="registrationNumberRules"
            label="Registration number"
            v-on:input="checkDuplicate($event, 'registrationNumber')"
            :error-messages="formError"
            required
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn 
          color="primary" 
          v-on:click="saveVehicle();"
          :disabled="!validForm">
          Add car
        </v-btn>
      </v-card-actions>
      <v-alert
        :value="submitError"
        color="error"
        icon="warning"
      >
        {{ submitError }}
      </v-alert>
    </v-card>
  </div>
</template>
 
<script>
import AddVehicle from "@/graphql/AddVehicle.gql";
import { mapState, mapMutations } from "vuex";

  export default {
    data: () => ({
      submitError: false,
      formError: "",
      validForm: false,
      registrationNumber: '',
      registrationNumberRules: [
        v => !!v || 'Registration number is required'
      ]
    }),
    computed: mapState(["user"]),
    methods: {
      ...mapMutations(["addVehicle"]),
      checkDuplicate(value){
        var duplicate = this.user.vehicles.find((car, index) => {
          return car.registrationNumber === value;
        });
        if(duplicate)
          this.formError = "You already have this car"
        else
          this.formError = null;
      },
      async saveVehicle(){
        const result = await this.$apollo.mutate({
          mutation: AddVehicle,
          variables: {
            registrationNumber: this.registrationNumber
          }
        });
      const data = result.data.addVehicle;
      this.submitError = false;
      if (data) {
        //Wihoo, I have new car
        this.addVehicle(data);
      } else {
        //Dude.. where's my car
        //Pls correct error message
        this.submitError = "Car wasnt added, you probably already have this car";
      }
    }
  }
}
</script>

