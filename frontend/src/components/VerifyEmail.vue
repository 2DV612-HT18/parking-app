<template>
  <div>
<v-btn 
                  color="primary" 
                  v-on:click="verifyEmail();"
                  >
                  Submit
                </v-btn>
        </div>
</template>
<script>

import { mapMutations } from "vuex";
import VerifyEmail from "@/graphql/VerifyEmail.gql";

  export default {
    /*
    created() {
    console.log(this.$route);
    console.log(this.$router.currentRoute.query.token);
    console.log("asd");

      const result = await this.$apollo.mutate({
        mutation: VerifyEmail,
        variables: {
          token: this.$router.currentRoute.query.token
        }

            });
*/
            
     data: () => ({
     
    }),
    methods: {
      async verifyEmail(){
        console.log("Lets verify: " + this.$router.currentRoute.query.token);

     const result = await this.$apollo.mutate({
        mutation: VerifyEmail,
        variables: {
          token: this.$router.currentRoute.query.token
        }

            });

      const data = result.data.verifyEmail;
      // Token exists
      if (data ) {
        
          console.log(data);
        // Redirect to homepage
       // this.$router.push("/");
        console.log("email verify successfull");
      } else {
        // register unsuccessful
        console.log("email verify unsuccessfull");
         console.log(data);
      }

      }
    
  //  this.baseaccount = this.$route.params.baseaccount;
  }
 // const data = result.data.registerUser;
      // Token exists
     // if (data ) {
        

        // Redirect to homepage
      //  this.$router.push("/");
       // console.log("successfull: " + this.email);
      //} else {
        // register unsuccessful
       // console.log("unsuccessfull: " + this.email);
     // }

    

      }


</script>