<template>
  <v-dialog max-width="290" v-model="show">
    <v-card>
      <v-card-title class="headline">{{ title }}</v-card-title>
      <v-card-text>{{ text }}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn color="red darken-1" flat="flat" @click="cancel();">
          {{ cancelText }}
        </v-btn>

        <v-btn color="green darken-1" flat="flat" @click="confirm();">
          {{ confirmText }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "ConfirmDialog",
  data: () => ({
    show: false,
    resolve: null,
    text: ""
  }),
  methods: {
    open(text) {
      this.text = text;
      this.show = true;
      return new Promise(resolve => {
        this.resolve = resolve;
      });
    },
    confirm() {
      this.show = false;
      this.resolve(true);
    },
    cancel() {
      this.show = false;
      this.resolve(false);
    }
  },
  props: ["title", "confirmText", "cancelText"]
};
</script>
