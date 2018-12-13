<template>
  <div>
    <v-alert
    v-model="alert"
    dissmissable
    type="success">
    {{message}}
    </v-alert>
  </div>
</template>
    
<script>
  export default {
    data () {
      return {
        alert: true
      }
    }
  }
</script>