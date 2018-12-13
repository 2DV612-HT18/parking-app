<template>
  <div>
    <v-alert type="success" :value="success"
      >Your email address has been successfully verified.</v-alert
    >
    <v-alert :value="fail" type="error"
      >Your email address failed to verify.</v-alert
    >
  </div>
</template>

<script>
import VerifyEmail from "@/graphql/VerifyEmail.gql";

export default {
  data: () => ({
    success: false,
    fail: false
  }),
  methods: {
    async verifyEmail() {
      const result = await this.$apollo.mutate({
        mutation: VerifyEmail,
        variables: {
          token: this.$router.currentRoute.query.token
        }
      });

      const data = result.data.verifyEmail;
      if (data) {
        this.success = true;
      } else {
        this.fail = true;
      }
    }
  },

  created() {
    this.verifyEmail();
  }
};
</script>
