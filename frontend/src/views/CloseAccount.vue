<template>
  <div>
    <ConfirmDialog
      ref="confirmDialog"
      title="Delete Account?"
      confirmText="Yes"
      cancelText="No"
    />
    <v-snackbar
      v-model="failed"
      color="error"
      icon="warning"
      :top="true"
      :multi-line="true"
      >{{ error_message }}<v-btn
        dark
        flat
        @click="failed = false"
      >
        Close
      </v-btn>
      </v-snackbar>
    <v-snackbar
      v-model="success"
      color="success"
      :top="true"
      :multi-line="true"
      >{{ success_message }}
      <v-btn
        dark
        flat
        @click="success = false"
      >
        Close
      </v-btn>
      </v-snackbar>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
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
                v-on:click="closeAccount();"
                >Close Account</v-btn
              >
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </div>
</template>

<script>
const CloseAccount = require("@/graphql/CloseAccount.gql");
import ConfirmDialog from "@/components/ConfirmDialog.vue";

export default {
  name: "CloseAccount",
  data() {
    return {
      wrong: false,
      validForm: false,
      passwordRules: [v => !!v || "Password is required"],
      input: {
        password: ""
      },
      success: false,
      failed: false,
      error_message: null,
      success_message: null
    };
  },
  components: {
    ConfirmDialog
  },
  methods: {
    async closeAccount() {
      let confirmPromise = this.$refs.confirmDialog.open(
        `Are you sure you want to delete the account?`
      );
      const confirm = await confirmPromise.then(value => {
        return value;
      });
      if (!confirm) {
        return;
      }
      const result = await this.$apollo.mutate({
        mutation: CloseAccount,
        variables: {
          password: this.input.password
        }
      });
      const data = result.data.closeAccount;
      // Token exists
      if (data) {
        this.failed = true;
        this.error_message = data[0].message;
      } else {
        this.success = true;
        this.success_message = "Remove successful.";
        this.$router.go(0);
      }
    }
  }
};
</script>
