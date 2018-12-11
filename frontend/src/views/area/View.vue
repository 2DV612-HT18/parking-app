<template>
  <div>
    <View-parking-area/>
    <AddRate v-if="addParkingAreaPermission"/>
  </div>
</template>

<script>
import ViewParkingArea from "@/components/ViewParkingArea.vue";
import AddRate from "@/components/AddRate.vue";

export default {
  components: {
    ViewParkingArea,
    AddRate
  },
  computed: {
    addParkingAreaPermission() {
      return this.$store.getters.addParkingAreaPermission;
    }
  }
}
</script>