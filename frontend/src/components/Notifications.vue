<template>
  <div>
    <v-card class="elevation-12">
      <v-list v-if="notifications">
        <v-list-tile
          v-for="notification in notifications"
          :key="notification.id"
        >
          <v-list-tile-title>{{ notification.message }}</v-list-tile-title>
          <v-list-tile-action>
            <v-btn
              icon
              ripple
              v-on:click="dismissNotification(notification.id);"
            >
              <v-icon color="red">delete</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </v-card>
  </div>
</template>

<script>
import GetNotifications from "@/graphql/GetNotifications.gql";
import DismissNotification from "@/graphql/DismissNotification.gql";
import { mapState, mapMutations } from "vuex";

export default {
  data: () => {
    return {
      notifications: []
    };
  },
  computed: mapState(["user"]),
  apollo: {
    getNotifications: {
      query: GetNotifications,
      fetchPolicy: "no-cache",
      result(data) {
        this.notifications = data.data.getNotifications;
      }
    }
  },
  methods: {
    ...mapMutations(["dismissNotification"]),
    async dismissNotification(id) {
      const result = await this.$apollo.mutate({
        mutation: DismissNotification,
        variables: {
          id: parseInt(id)
        }
      });
      const status = result.data.dismissNotification;
      if (status) {
        this.dismissNotification(id);
      }
    }
  }
};
</script>

<!--
  <v-alert v-model="alert" dismissable type="info">{{notification.message}}</v-alert>
-->
