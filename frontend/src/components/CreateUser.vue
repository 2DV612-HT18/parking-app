<template>
  <div>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-snackbar
              v-model="success"
              color="success"
              :top="true"
              :multi-line="true"                   
            >{{ success_message }}</v-snackbar>
            <v-snackbar
              v-model="failed"
              color="error"
              :top="true"
              :multi-line="true"                   
            >{{ failed_message }}</v-snackbar>
            <v-card class="elevation-12">              
              <v-toolbar dark color="primary">
                <v-toolbar-title>{{ form_title }}</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form v-model="validForm">
                  <v-text-field
                    v-model="firstName"
                    :rules="firstNameRules"
                    label="First name"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="lastName"
                    :rules="lastNameRules"
                    label="Last name"
                    required
                  ></v-text-field>
                  <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
                  <v-text-field v-model="pnr" :rules="pnrRules" label="Personal number" required></v-text-field>
                  <v-text-field
                    v-model="password"
                    :rules="passwordRules"
                    :type="'password'"
                    label="Password"
                    required
                  ></v-text-field>
                  <v-select
                    v-model="role"                   
                    :rules="roleRules"
                    :items="roles"
                    item-value="name" 
                    item-text="name"
                    label="Role"
                    required
                  >                  
                  </v-select>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn to="/">Cancel</v-btn>
                <v-btn color="primary" v-on:click="register();" :disabled="!validForm">Submit</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import GetRoles from "@/graphql/GetRoles.gql";

// Must be require instead of import!
const RegisterUser = require("@/graphql/RegisterUser.gql");
const AddUser = require("@/graphql/AddUser.gql");

export default {
  props: ['form_title', 'mutationName', 'success_message', 'failed_message'],
  data: () => ({
    
    roles: [],
    validForm: false,
    firstName: "",
    firstNameRules: [v => !!v || "First name is required"],
    lastName: "",
    lastNameRules: [v => !!v || "Last name is required"],
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+/.test(v) || "E-mail must be valid"
    ],
    pnr: "",
    pnrRules: [v => !!v || "Personal number is required"],
    password: "",
    passwordRules: [v => !!v || "Password is required"],
    role: "",
    roleRules: [v => !!v || "Must select a role"],
    success: false,
    failed: false,
  }),    
  methods: {
    async register() {
      const result = await this.$apollo.mutate({
        mutation: eval(this.mutationName),
        variables: {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          personalNumber: this.pnr,
          password: this.password,
          role: this.role
        }
      });

      // Register user
      if (this.mutationName == "RegisterUser") {
        const data = result.data.registerUser;
        // Token exists
        if (data) {
          // Redirect to homepage
          // Display snackbar! 
          this.success = true         
          this.$router.push({path: "/login", query: {registered: true}});          
        } else {
          // register unsuccessful
          // Display snackbar!
          this.failed = true
          console.log("unsuccessfull: " + this.email);
        } // Admin create a user
      } else if (this.mutationName = "AddUser") {
        const data = result.data.addUser;
        if (data) {
          // Display snackbar! 
          this.success = true                  
        } else {          
          // Display snackbar!
          this.failed = true
        }
      }
    },
  },    
    apollo: {
      getAllRoles: {
        query: GetRoles,
        result(data) {         
          this.roles = data.data.getAllRoles;      
        }
      }
  },  
};
</script>
