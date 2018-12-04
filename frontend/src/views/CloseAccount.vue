<template>
  <div>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-snackbar
              v-model="wrong"
              color="error"
              :top="true"
              :multi-line="true"                   
            >Wrong password!</v-snackbar>
              <v-card-text>
                <v-form v-model="validForm">
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
                  v-on:click="closeAccount();">
                  Close Account
                </v-btn>
              </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </div>
</template>


<script>
import { mapMutations } from "vuex";
import CloseAccount from "@/graphql/CloseAccount.gql";

export default {
  name: "CloseAccount",  
  data() {    
    return {
      wrong: false,
      validForm: false,
      passwordRules: [
        v => !!v || 'Password is required'
      ],
      input: {
        password: ""
      }
    };
  },
  methods: {
    async closeAccount() {
      const result = await this.$apollo.mutate({
        mutation: CloseAccount,
        variables: {
          password: this.input.password
        }
      });

      const status = result.data.closeAccount;
      // Token exists
      if (status) {
        // Redirect to homepage
        this.$router.push("/");
      } else {
        // password wrong
        this.wrong = true;
      }
    }
  }
};
</script>

