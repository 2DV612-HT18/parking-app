<template>
  <div>
        </div>
</template>
<script>

import { mapMutations } from "vuex";
import VerifyEmail from "@/graphql/VerifyEmail.gql";

  export default {

      data: () => ({
     
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
          } else {
            console.log("email verify unsuccessfull");
          }

        } 
        

      },

      created () {
        this.verifyEmail();
          
      }

    }


</script>