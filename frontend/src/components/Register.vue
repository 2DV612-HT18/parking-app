<template>
  <div id="reg">
    <h1>Register</h1>
    <v-form v-model="valid">
      <v-text-field
        v-model="firstName"
        :rules="nameRules"
        label="First name"
        required
      ></v-text-field>
      <v-text-field
        v-model="lastName"
        :rules="nameRules"
        label="Last name"
        required
      ></v-text-field>
      <v-text-field
        v-model="email"
        :rules="nameRules"
        label="E-mail"
        required
      ></v-text-field>
      <v-text-field
        v-model="pnr"
        :rules="nameRules"
        label="Personal number"
        required
      ></v-text-field>
      <v-text-field
        v-model="password"
        :rules="emailRules"
        label="Password"
        required
      ></v-text-field>
    </v-form>
    <v-layout justify-space-between>
      <v-btn>Cancel</v-btn>
      <v-btn>Submit</v-btn>
    </v-layout>
  </div>
</template>

<script>
  export default {
    data: () => ({
      valid: false,
      firstName: '',
      FirstNameRules: [
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
        v => !!v || 'Personal nr. is required'
      ],
      password: '',
      passwordRules: [
        v => !!v || 'Password is required'
      ]
    })
  }
</script>

<style>
  #reg
  {
    width: 500px;
    margin: auto;
    margin-top: 100px;
  }

  h1
  {
    text-align: center;
  }

</style>
