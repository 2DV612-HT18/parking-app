<template>
  <div>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <Register 
            :form_title=form_title
            :success_message=success_message
            :failed_message=failed_message
            :mutationName=mutationName
            />
          </v-flex> 
        </v-layout>
      </v-container>
    </v-content>
  </div>
</template>

<script>
import Register from "@/components/CreateUser";

export default {
  components: {
    Register
  }, 
  data() {
    return {
      form_title: "Register",
      success_message: "You successfully registered your account!",
      failed_message: "Email is already taken!",
      mutationName: "RegisterUser"
    };
  }
};

</script>
