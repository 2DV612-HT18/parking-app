<template>
  <div>
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

  <v-card class="elevation-12">
      <v-toolbar dark color="primary">
        <v-toolbar-title>{{ form_title }}</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-form v-model="validForm">
          <v-text-field
            v-model="notification"
            label="Notification"
            required
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn to="/">Cancel</v-btn>
        <v-btn color="primary" v-on:click="sendMsg();">Send</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
// Must be require instead of import!
// eslint-disable-next-line no-unused-vars
const AddNotification = require("@/graphql/AddNotification.gql");

export default {
  props: ["form_title", "mutationName"],
  data: () => ({
    notification: "",
    error_message: null,
    success_message: null
    }),
  methods: {
    async sendMsg() {
      const result = await this.$apollo.mutate({
        mutation: eval(this.mutationName),
        variables: {
          message: this.notification
        }
      });

      if (this.mutationName === "AddNotification") {
        const data = result.data.AddNotification;
        if (data) {
          // Display snackbar!
          this.failed = true;
          this.error_message = data[0].message
        } else {
          // Display snackbar!
          this.success = true;
          this.success_message = "Notification successful.";
          this.$router.push({ path: "/admin", query: { created: true } });
        }
      }
    }
  }
};
</script>
