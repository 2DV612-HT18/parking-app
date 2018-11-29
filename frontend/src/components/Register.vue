<template>
  <div>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Register</v-toolbar-title>
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
                </v-form>
              </v-card-text>

              <v-flex xs12 sm6 d-flex>
                <v-select
                v-model="rol"
                :items="roles"
                label="Solo field"
                solo
                ></v-select>

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
import RegisterUser from "@/graphql/RegisterUser.gql";
export default {
  data: () => ({

    Roles: ['User', 'ParkingOwner'], //to do Role = value from query.

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
      rol: '',
      passwordRules: [
        v => !!v || 'Must select a role'
      ]
  }),
  methods: {
    async register() {
      console.log("Lets register this user: " + this.email);
      const result = await this.$apollo.mutate({
        mutation: RegisterUser,
        variables: {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          personalNumber: this.pnr,
          password: this.password,
          role: this.rol
        }
      });
      const data = result.data.registerUser;
      // Token exists
      if (data) {
        // Redirect to homepage
        this.$router.push("/");
        console.log("successfull: " + this.email);
      } else {
        // register unsuccessful
        console.log("unsuccessfull: " + this.email);
      }
    }
  }
};
</script>
