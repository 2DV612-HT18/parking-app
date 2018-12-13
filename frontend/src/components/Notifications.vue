<template>
  <div>
    <v-card class="elevation-12" v-if="notifications.length">
      <v-alert
        :value="true"
        type="info"
        v-for="notification in notifications"
        :key="notification.id"
      >
        {{ notification.message }}
        <v-btn
          icon
          v-on:click="dismissNotification(notification.id);"
          absolute
          right
          middle
          style="top: 8px;"
        >
          <v-icon color="white">clear</v-icon>
        </v-btn>
      </v-alert>
    </v-card>
  </div>
</template>

<script>
import GetNotifications from "@/graphql/GetNotifications.gql";
import DismissNotification from "@/graphql/DismissNotification.gql";

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
  },
  methods: {
    async dismissNotification(id) {
      const result = await this.$apollo.mutate({
        mutation: DismissNotification,
        variables: {
          id: parseInt(id)
        }
      });
      const status = result.data.dismissNotification;
      if (status) {
        // Remove dismissed notification from list
        this.notifications = this.notifications.filter(n => n.id !== id);
      }
    }
  }
};
</script>

<!--
  <v-alert v-model="alert" dismissable type="info">{{notification.message}}</v-alert>
-->
