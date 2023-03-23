<template>
<div class="portfolioDiv">
  <div v-if="checkedValues.length != 0">
    <v-app id="inspire">
      <v-main class="bg-grey-lighten-2 card">
        <v-container>
          <v-row>
            <v-col cols="12" sm="8">
              <v-sheet min-height="70vh" rounded="lg" class="portfolio-card">
                <SheetComponent
                  v-for="(item, index) in checkedValues"
                  :key="index"
                  :title="item.symbol"
                  :price="item.price"
                  :buy="true"
                  :item="item"
                  @buy-item="buyItemHandler"
                />
              </v-sheet>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-app>
  </div>
  <div class="NoData" v-else>{{MESSAGES}}</div>
  </div>
  <div class="buttonDiv">
  <button class="button" @click="proceedItem" :disabled="this.checkedValues && this.checkedValues.length != 0 ? false : true">{{PROCEED}}</button>
  <button class="button" @click="backItem">{{BACK}}</button>
  </div>


</template>

<script>
import SheetComponent from "../components/SheetComponent.vue";
import {BUTTONS,MESSAGES,LOCALSTORAGE} from "../Commons/Constants"
import store from "../Store/Store";
import { mapState } from "vuex";
import router from '@/router';

export default {
  components: { SheetComponent },
  name: "PortFolio",
  data: () => ({
    drawer: null,
    boughtItems: [],
    PROCEED:BUTTONS.PROCEED,
    BACK:BUTTONS.BACK,
    MESSAGES:MESSAGES.NO_CHECKLISTS
  }),
  computed: {
    ...mapState({
      checkedValues: (state) => state.checkedValues,
    }),
  },
  methods: {
    buyItemHandler(item) {
      const checkedIndex = this.boughtItems.findIndex(
        (boughtItem) => boughtItem.symbol === item.symbol
      );
      if (checkedIndex === -1) {
        this.boughtItems.push(item);
        store.commit("updateStockData", this.boughtItems);
        localStorage.setItem(LOCALSTORAGE.BOUGHT_ITEMS, JSON.stringify(this.boughtItems));
      }
      const portfolioValues = this.checkedValues;
      const index = portfolioValues.indexOf(item);
      if (index > -1) {
        portfolioValues.splice(index, 1);
      }
      localStorage.setItem(LOCALSTORAGE.SELECTED_ITEMS, JSON.stringify(portfolioValues));
      store.commit("updateCheckedValues", portfolioValues);
    },
     proceedItem(){
       router.push('/stocks')
  },
  backItem(){
    router.push('/dashBoard')
  }
  },
  mounted() {
    const boughtItems = JSON.parse(localStorage.getItem(LOCALSTORAGE.BOUGHT_ITEMS)) || [];
    this.boughtItems = boughtItems;
  },
};
</script>

<style scoped>
.card {
  border-radius: 0.3rem;
  margin-top: 3%;
  box-shadow: #333;
}
.portfolio-subcard {
  border-radius: 0.3rem;
  border: 1px solid #0FA774;
  margin-left: 5%;
  margin-top: 3%;
}

.portfolio-card {
  background-color: #f5f5f5;
  padding: 1%;
  font-family: monospace
}
.NoData {
  display: flex;
  margin-top: 15%;
  margin-left: 35%;
  font-size: 1.2rem;
  font-weight: 700;
  font-family: monospace
}
.button{
  background: #59b0f8;
  border: 0;
  padding: 10px 20px;
  color: white;
  border-radius: 20px;
  margin-left: 2%;
  font-family: monospace;
  margin-bottom: 10px;
}
.buttonDiv{
  margin-left: 35%;
}
.portfolioDiv{
   height: 100%;
}
 button[disabled]{
    background: gray
}
</style>