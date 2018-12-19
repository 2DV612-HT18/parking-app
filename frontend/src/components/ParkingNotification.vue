<template>

    <v-card class="elevation-12">
      <v-alert
        v-model="show"
        type="warning">

        {{ notification }}

      </v-alert>
    </v-card>

</template>



<script>

export default {
    data: () => ({
        show: false,
        notification: "You are outside of your current parking area and might want to consider cancelling your ticket.",
        calculatedDistance: 0,
        center: 0
    }),
    methods: {
        getParkingAreas() {
            // loop through parking areas. Compare user's position with each one. If more than 100 km than true

            // return this.$store.state.currentParkingAreas;

            // Test position (Falun, Dalarna)
            return { lat: 60.605386, lng: 15.635459 }
        },
        geolocate() {
            // Get user's current position
          navigator.geolocation.getCurrentPosition(position => {
            this.center = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            let pos2 = this.getParkingAreas();

            this.calculatedDistance = this.distance(this.center.lat, this.center.lng, pos2.lat, pos2.lng, "K");

            if (this.calculatedDistance > 100) {
                console.log("Distance from parking area: " + this.calculatedDistance + " km");
                console.log("User is more than 100 km from current parking area – Show notification.")
                this.show = true;
            } else {
                console.log(this.calculatedDistance + " km");
                console.log("User is within 100 km of current parking area - No notification")
                this.show = false;
            }

            // Show notification if above is true
            // How do we show notification?

          });
      },
      distance(lat1, lon1, lat2, lon2, unit) {
      /* calculates distance between 2 coordinates */
    	if ((lat1 == lat2) && (lon1 == lon2)) {
    		return 0;
    	}
    	else {
    		var radlat1 = Math.PI * lat1/180;
    		var radlat2 = Math.PI * lat2/180;
    		var theta = lon1-lon2;
    		var radtheta = Math.PI * theta/180;
    		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    		if (dist > 1) {
    			dist = 1;
    		}
    		dist = Math.acos(dist);
    		dist = dist * 180/Math.PI;
    		dist = dist * 60 * 1.1515;
    		if (unit=="K") { dist = dist * 1.609344 }
    		return dist;
    	}
    }
    },
    created() {
        this.geolocate();
    }
}



</script>
