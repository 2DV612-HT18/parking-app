import Vue from "vue";
import "vue-googlemaps/dist/vue-googlemaps.css";
import VueGoogleMaps from "vue-googlemaps";

Vue.use(VueGoogleMaps, {
  load: {
    // Google API key
    apiKey: process.env.VUE_APP_GOOGLE_MAPS_API,
    // Enable more Google Maps libraries here
    libraries: ["places"],
    // Use new renderer
    useBetaRenderer: false
  }
});
