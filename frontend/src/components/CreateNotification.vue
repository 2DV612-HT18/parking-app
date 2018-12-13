<template>
  <div>         
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
import AddNotification from "@/graphql/AddNotification.gql";
import { mapMutations } from "vuex";

export default {
  props: ['form_title', 'mutationName'],
  data: () => ({
    notification: ""
  }),    
  methods: {
    async sendMsg() {
      const result = await this.$apollo.mutate({
        mutation: eval(this.mutationName),
        variables: {
          notification: this.notification,
        }
      });
    }
  }  
}
</script>
