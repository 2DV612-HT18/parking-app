<template>
<div>
  <v-alert
      type="success"
      :value="success"
    >
    Your email address has been successfully verified.
    </v-alert>

 <v-alert
      :value="fail"
      type="error"
    >
      Your email address failed to verify.
    </v-alert>

    </div>
</template>

<script>

import { mapMutations } from "vuex";
import VerifyEmail from "@/graphql/VerifyEmail.gql";

  export default {

      data: () => ({
     success: false,
     fail: false
    }),
      methods: {
        async verifyEmail(){
          console.log("Lets verify with " + this.$router.currentRoute.query.token);

          const result = await this.$apollo.mutate({
            mutation: VerifyEmail,
              variables: {
                token: this.$router.currentRoute.query.token
              }

          });

          const data = result.data.verifyEmail;
          if (data ) {
            console.log("email verify successfull");
            this.success=true;
          } else {
            console.log("email verify unsuccessfull");
            this.fail=true
          }

        } 
        

      },

      created () {
        this.verifyEmail();
          
      }

    }


</script>