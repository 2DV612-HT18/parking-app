<template>
  <div>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-snackbar
              v-model="registered"
              color="success"
              :top="true"
              :multi-line="true"                   
            >You successfully registered your account, you've received a verification email, so please verify your account and then you can login!</v-snackbar>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Login</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form v-model="validForm">
                  <v-text-field
                    type="text"
                    name="username"
                    v-model="input.username"
                    :rules="emailRules"
                    placeholder="Username"
                  />
                  <v-text-field
                    type="password"
                    name="password"
                    v-model="input.password"
                    :rules="passwordRules"
                    placeholder="Password"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn 
                  color="primary"
                  :disabled="!validForm" 
                  v-on:click="login();">
                  Login
                </v-btn>
              <v-btn to="/register" color="primary">Not a member?</v-btn>
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
import { onLogin } from "@/vue-apollo";
import LoginUser from "@/graphql/LoginUser.gql";

export default {
  name: "Login",  
  data() {    
    return {
      validForm: false,
      emailRules: [
        v => !!v || 'E-mail is required to login',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      passwordRules: [
        v => !!v || 'Password is required'
      ],
      input: {
        username: "",
        password: ""
      },
      registered: this.$router.currentRoute.query.registered
    };
  },
  methods: {
    ...mapMutations(["setUser"]),
    async login() {
      const result = await this.$apollo.mutate({
        mutation: LoginUser,
        variables: {
          email: this.input.username,
          password: this.input.password
        }
      });

      const data = result.data.loginUser;
      // Token exists
      if (data && data.token) {
        const apolloClient = this.$apollo.provider.defaultClient;
        // Sets token in localhost
        await onLogin(apolloClient, data.token);
        await this.setUser(data.user);

        // Redirect to homepage
        this.$router.push("/");
      } else {
        // Login unsuccessful
      }
    },
    loginMock() {
      if (this.input.username != "" && this.input.password != "") {
        if (
          this.input.username == this.$parent.mockAccount.username &&
          this.input.password == this.$parent.mockAccount.password
        ) {
          this.$emit("authenticated", true);
          this.$router.replace({ name: "secure" });
        } else {
          alert("The username and / or password is incorrect");
        }
      } else {
        alert("A username and password must be present");
      }
    },
  }
};
</script>

