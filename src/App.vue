<template>
  <v-app>
    <v-main>
      <NavigationDrawer />
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import NavigationDrawer from './components/NavigationDrawer.vue';

export default {
  name: 'App',
  components: {
    NavigationDrawer,
  },

  data: () => ({
    //
  }),
};
</script>
