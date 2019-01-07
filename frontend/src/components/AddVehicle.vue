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
    <v-card class="elevation-12">
      <v-toolbar dark color="primary">
        <v-toolbar-title>Add car</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-form v-model="validForm" ref="form">
          <v-text-field
            v-model="registrationNumber"
            :rules="registrationNumberRules"
            label="Registration number"
            v-on:input="checkDuplicate($event, 'registrationNumber');"
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
          :disabled="!validForm"
          >Add car</v-btn
        >
      </v-card-actions>
      <v-alert :value="submitError" color="error" icon="warning">{{
        submitError
      }}</v-alert>
    </v-card>
  </div>
</template>

<script>
const AddVehicle = require("@/graphql/AddVehicle.gql");
import { mapState, mapMutations } from "vuex";

export default {
  props: ["mutationName", "failed_message"],
  data: () => ({
    submitError: false,
    formError: "",
    validForm: false,
    registrationNumber: "",
    registrationNumberRules: [v => !!v || "Registration number is required"],
    success: false,
    failed: false,
    error_message: null,
    success_message: null
  }),
  computed: mapState(["user"]),
  methods: {
    ...mapMutations(["addVehicle"]),
    checkDuplicate(value) {
      var duplicate = this.user.vehicles.find(car => {
        return car.registrationNumber === value;
      });
      if (duplicate) this.formError = "You already have this car";
      else this.formError = null;
    },
    async saveVehicle() {
      const result = await this.$apollo.mutate({
        mutation: AddVehicle,
        variables: {
          registrationNumber: this.registrationNumber
        }
      });
      const data = result.data.addVehicle;
      this.submitError = false;
      if (data) {
        //something went wrong
        this.failed = true;
        this.error_message = data[0].message;
      } else {
        //successfully adding a car
        this.success = true;
        this.success_message = "Successful added " + this.registrationNumber;        
        this.addVehicle({id: 0, registrationNumber: this.registrationNumber, userId: this.user.id})
        this.$refs.form.reset()
      }
    }
  }
};
</script>
