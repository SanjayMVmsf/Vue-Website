<template>
  <v-app-bar class="px-3" color="#a7a409" flat density="compact">
 
    <v-app-bar-nav-icon
      v-if="!drawer"
      @click="handleMenuClick"
      color="white"
    ></v-app-bar-nav-icon>
    <v-spacer></v-spacer>
    <div class="headingDiv">
    <span class="heading">Stock Trader</span>
    </div>

    <v-spacer></v-spacer>

    <!-- <div class="notification-container">
    <div class="notification-icon" @click="toggleNotifications">
      <i class="fa fa-bell"></i>
    </div>
  </div> -->

  </v-app-bar>

  <v-navigation-drawer v-model="drawer" color="#0FA774">
    <v-sheet color="#0FA774" class="pa-4">
      <v-avatar class="mb-4" color="#fff" size="64"></v-avatar>
      <button
        type="button"
        class="close"
        color="#ffffff"
        @click="handleMenuClick"
      >
        X
      </button>
      <div class="username">{{NAME}}</div>
    </v-sheet>
    <v-divider></v-divider>

    <v-list>
      <v-list-item v-for="item in DASHBOARD_MENU" :key="item[1]" link @click="handleListClick(item[1])" font-weight="700">
        <template v-slot:prepend>
          <v-icon color="#ffffff">{{ item[0] }}</v-icon>
        </template>

        <v-list-item-title>{{ item[1] }}</v-list-item-title>
      </v-list-item>
    </v-list>
    <!--  -->
  </v-navigation-drawer>
</template>

<script>
import router from '@/router';
import {DASHBOARD_MENU,DASHBOARD_MENU_TEXT,USERNAME} from '../Commons/Constants'
export default {
  name: "NavigationDrawer",
  components:[DASHBOARD_MENU],
  data: () => ({
    drawer: null,
    DASHBOARD_MENU: DASHBOARD_MENU,
    NAME:USERNAME.NAME
  }),
  methods: {
    handleMenuClick() {
      this.drawer = !this.drawer;
    },
    handleListClick(text){
     if(text == DASHBOARD_MENU_TEXT.PORTFOLIO){
        router.push('/portfolio')
     }
     else if(text == DASHBOARD_MENU_TEXT.HOME){
        router.push('/')
     }
      else if(text == DASHBOARD_MENU_TEXT.STOCKS){
        router.push('/stocks')
     }
     else if(text == DASHBOARD_MENU_TEXT.DASHBOARD){
       router.push('/dashboard')
     }
    }
  },
};
</script>

<style scoped>
.close {
  padding-left: 148px;
  color: #fff;
}
.heading {
  font-family: monospace;
  color: #fff;
  font-weight: 900;
  font-style: italic;
  font-size: 24px;
  letter-spacing: 0px;
}
.notification-container {
  position: relative;
}
.notification-icon {
  cursor: pointer;
  display: inline-block;
  position: relative;
}
.fa-bell{
    color: #fff;
    font-size: 21px;
}
.headingDiv{
    position: fixed;
    margin-left: 40%;
}
.v-list-item-title{
  font-weight: 800;
  color:#ffffff;
  font-size: 17px;
  font-family: monospace
}

.username{
 font-weight: 800;
  color:#ffffff;
   font-size: 17px;
   font-family: monospace
}
</style>