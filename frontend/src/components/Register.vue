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
                  <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    label="E-mail"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="pnr"
                    :rules="pnrRules"
                    label="Personal number"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="password"
                    :rules="passwordRules"
                    label="Password"
                    required
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn 
                  to="/">
                  Cancel
                </v-btn>
                <v-btn 
                  color="primary" 
                  v-on:click="register();"
                  :disabled="!validForm">
                  Submit
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </div>
</template>

<script>
  export default {
    data: () => ({
      validForm: false,
      firstName: '',
      firstNameRules: [
        v => !!v || 'First name is required'
      ],
      lastName: '',
      lastNameRules: [
        v => !!v || 'Last name is required'
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      pnr: '',
      pnrRules: [
        v => !!v || 'Personal number is required'
      ],
      password: '',
      passwordRules: [
        v => !!v || 'Password is required'
      ]
    }),
    methods: {
      register(){
        console.log("Lets register this user: " + this.email);
      }
    }
  }
</script>

