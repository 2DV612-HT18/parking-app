<template>
  <div>
    <h1>Members area</h1>
    <div v-if="user">Email: {{ user.email }}</div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: mapState(["user"])
};
</script>
