<template>
  <div><Register 
    :form_title=form_title
    :mutationName=mutationName
  /></div>
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
      mutationName: "RegisterUser"
    };
  }
};

</script>
