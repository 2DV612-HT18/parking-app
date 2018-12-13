<template>
  <div>
    <v-card class="elevation-12">
      <v-list v-if="notifications">
        <v-list-tile v-for="notification in notifications" :key="notification.id" avatar>
          <v-list-tile-avatar>
            <v-icon large light>Notifications</v-icon>
          </v-list-tile-avatar>
            <v-list-tile-title>{{ notification.message }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
        <v-card-title v-if="!notifications.length">
        <span class="mb-2">You have no notifications at the moment!</span>
    </v-card-title>

    </v-card>
  </div>
</template>

<script>
import GetNotifications from "@/graphql/GetNotifications.gql";

export default {
  data: () => {
    return {
      notifications: []
    };
  },
  apollo: {
    getNotifications: {
      query: GetNotifications,
      fetchPolicy: "no-cache",
      result(data) {
        this.notifications = data.data.getNotifications;
      }
    }
  }
};
</script>
<!-- <v-alert v-model="alert" dismissable type="info">{{notification.message}}</v-alert> -->
