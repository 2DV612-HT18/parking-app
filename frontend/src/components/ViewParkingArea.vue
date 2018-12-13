<template>
  <div>
    <ConfirmDialog
      ref="confirmDialog"
      title="Delete Parking Area?"
      confirmText="Yes"
      cancelText="No"
    />
    <v-content>
      <v-container>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>{{ this.parkingArea.name }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <router-link
              :to="{ path: `/area/edit/${parseInt(this.$route.params.id)}` }"
              v-if="canEdit"
            >
              <v-btn fab dark small color="green">
                <v-icon color="white">edit</v-icon>
              </v-btn>
            </router-link>
            <v-btn
              fab
              dark
              small
              color="red"
              v-on:click="deleteParkingArea();"
              v-if="canEdit"
            >
              <v-icon color="white">delete</v-icon>
            </v-btn>
          </v-toolbar>
          <ViewRates :rates="parkingArea.rates" />
        </v-card>
      </v-container>
    </v-content>
  </div>
</template>
<script>
import GetParkingArea from "@/graphql/GetParkingArea.gql";
import RemoveParkingArea from "@/graphql/removeParkingArea.gql";
import ConfirmDialog from "@/components/ConfirmDialog.vue";
import ViewRates from "@/components/ViewRates.vue";

export default {
  name: "ViewParkingArea",
  components: {
    ViewRates,
    ConfirmDialog
  },
  data: () => {
    return {
      parkingArea: {}
    };
  },
  computed: {
    canEdit() {
      return this.parkingArea.owner.id === this.$store.state.user.id;
    }
  },
  apollo: {
    getParkingArea: {
      query: GetParkingArea,
      fetchPolicy: "no-cache",
      variables() {
        return {
          id: parseInt(this.$route.params.id)
        };
      },
      result(data) {
        this.parkingArea = data.data.getParkingArea;
      }
    }
  },
  methods: {
    async deleteParkingArea() {
      let confirmPromise = this.$refs.confirmDialog.open(
        `Are you sure you want to delete?`
      );
      const confirm = await confirmPromise.then(value => {
        return value;
      });
      if (!confirm) {
        return;
      }
      await this.$apollo.mutate({
        mutation: RemoveParkingArea,
        variables: {
          id: parseInt(this.$route.params.id)
        }
      });
      this.$router.push({ name: "ParkingAreas" });
    }
  }
};
</script>
