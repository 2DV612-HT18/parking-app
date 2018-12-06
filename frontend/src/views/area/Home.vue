<template>
  <div>
    <v-content>
      <v-container>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Parking Areas</v-toolbar-title>
            <v-btn
              :to="{ name: 'CreateParkingArea' }"
              color="blue lighten-3"
              absolute
              light
              right
            >
              <v-icon>add</v-icon>
              <span style="margin-left: 5px">Create new area</span>
            </v-btn>
          </v-toolbar>
          <v-card-text>Area list here</v-card-text>
        </v-card>
      </v-container>
    </v-content>
  </div>
</template>
