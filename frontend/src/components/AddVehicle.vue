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
            required
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn 
          color="primary" 
          v-on:click="addVehicle();"
          :disabled="!validForm">
          Add car
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
 
<script>
import { mapMutations } from "vuex";
import AddVehicle from "@/graphql/AddVehicle.gql";

  export default {
    data: () => ({
      validForm: false,
      registrationNumber: '',
      registrationNumberRules: [
        v => !!v || 'Registration number is required'
      ]
    }),
    methods: {
      async addVehicle(){
        console.log("Dude let's add this car: " + this.registrationNumber);
        const result = await this.$apollo.mutate({
          mutation: AddVehicle,
          variables: {
            registrationNumber: this.registrationNumber
          }
        });
      const data = result.data.addVehicle;
      // Token exists
      if (data) {
        //Wihoo, I have new car
        console.log("successfull: " + this.registrationNumber);
      } else {
        //Dude.. where's my car
        console.log("unsuccessfull: " + this.registrationNumber);
      }
    }
  }
}
</script>

