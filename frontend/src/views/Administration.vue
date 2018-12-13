<template>
  <div>
    <v-snackbar
      :v-model="created"
      color="success"
      :top="true"
      :multi-line="true"                   
    >You successfully registered your account, you've received a verification email, so please verify your account and then you can login!</v-snackbar>
    <v-content>
      <v-container >
        <v-card class="elevation-12">
            <v-toolbar dark color="primary">
              <v-toolbar-title>Administration</v-toolbar-title>
            </v-toolbar>
            <div class="">
              <v-card-text>
                Welcome to the admin panel!   
              </v-card-text>        
            </div>          
        </v-card>
        <Notification
          :form_title=noti_title
          :mutationName=noti_mutation
        />           
        <AddUser
          :form_title=form_title
          :success_message=success_message
          :failed_message=failed_message
          :mutationName=mutationName
        />           
      </v-container>
    </v-content>
  </div>
</template>

<script>
import AddUser from "@/components/CreateUser";
import Notification from "@/components/CreateNotification";

export default {
components: {
    Notification,
    AddUser
  }, 
  data() {
    created: this.$router.currentRoute.query.created
    return {
      noti_title: "Send a notification",
      mutationName: "Notification",
      form_title: "Create a user",
      success_message: "You successfully created a user account!",
      failed_message: "Email is already taken!",
      mutationName: "AddUser"
    };
  }  
};
</script>

