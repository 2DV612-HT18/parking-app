<template>
  <div>
    <div v-if="user">
      <h1>Hello {{ user.email }}!</h1>
    </div>
    <div v-else><router-link to="/login">Login</router-link></div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: mapState(["user"])
};
</script>
