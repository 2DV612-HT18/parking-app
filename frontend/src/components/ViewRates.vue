<template>
  <div>
    <v-card-title> <h3 class="headline mb-0">Rates</h3> </v-card-title>
    <v-data-table :headers="headers" :items="rates" class="elevation-1">
      <template slot="items" slot-scope="rate">
        <td class="text-xs-left">{{ rate.item.startDate }}</td>
        <td class="text-xs-left">{{ rate.item.startTime }}</td>
        <td class="text-xs-left">{{ rate.item.endDate }}</td>
        <td class="text-xs-left">{{ rate.item.endTime }}</td>
        <td class="text-xs-left">{{ rate.item.charge }}</td>
      </template>

      <template slot="no-data">
        <v-alert :value="true" type="info">
          No rates for this area. (Free parking!)
        </v-alert>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  name: "ViewRates",
  data() {
    return {
      headers: [
        { text: "Start date", value: "startDate" },
        { text: "StartTime", value: "startTime" },
        { text: "End time", value: "endTime" },
        { text: "End date", value: "endDate" },
        { text: "Charge", value: "charge" }
      ]
    };
  },
  props: ["rates"]
};
</script>
