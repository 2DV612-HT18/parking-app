<template>
  <div>
    <ConfirmDialog ref="confirmDialog" title="Remove vehicle" confirmText="Yes" cancelText="No"/>
    <v-card class="elevation-12">
      <v-toolbar dark color="primary">
        <v-toolbar-title>My cars</v-toolbar-title>
      </v-toolbar>
      <v-list v-if="vehicles">
        <v-list-tile v-for="car in vehicles" :key="car.id" avatar>
          <v-list-tile-avatar>
            <v-icon large light>directions_car</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>
              {{car.registrationNumber}}
              <span
                class="red--text"
                v-if="removeError[car.id]"
              >Vehicle wasnt removed, please reload page and try again</span>
            </v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-btn icon ripple v-on:click="deleteVehicle(car.id, car.registrationNumber);">
              <v-icon color="red">delete</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
      <v-card-title v-if="!vehicles.length">
        <span class="mb-2">You dont have any cars.</span>
      </v-card-title>
    </v-card>
  </div>
</template>

<script>
import RemoveVehicle from "@/graphql/RemoveVehicle.gql";
import ConfirmDialog from "@/components/ConfirmDialog.vue";
import { mapState, mapMutations } from "vuex";
import _ from "underscore";

export default {
  data: () => ({
    removeError: {},
    confirmation: false
  }),
  components: {
    ConfirmDialog
  },
  props: ["vehicles"],
  computed: mapState(["user"]),
  methods: {
    ...mapMutations(["removeVehicle"]),
    async deleteVehicle(id, regNbr) {
      let confirmPromise = this.$refs.confirmDialog.open(
        `Are you sure you want to remove vehicle: ${regNbr}?`
      );
      const confirm = await confirmPromise.then(value => {
        return value;
      });
      if (!confirm) {
        return;
      }
      const result = await this.$apollo.mutate({
        mutation: RemoveVehicle,
        variables: {
          id: parseInt(id)
        }
      });
      const status = result.data.removeVehicle;
      if (status) {
        this.removeVehicle(id);
      } else {
        this.$set(this.removeError, id, true);
      }
    }
  }
};
</script>