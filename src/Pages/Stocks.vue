<template>
  <div class="stocksDiv">
    <div v-if="stockData.length != 0">
      <v-app id="inspire">
        <v-main class="bg-grey-lighten-2 card">
          <v-container>
            <v-row>
              <v-col cols="12" sm="8">
                <v-sheet min-height="70vh" rounded="lg" class="Stocks-card">
                  <SheetComponent
                    v-for="(item, index) in stockData"
                    :key="index"
                    :title="item.symbol"
                    :price="item.price"
                    :buy="false"
                    :item="item"
                    @sell-item="sellItemHandler"
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
    <button class="button" @click="backItem">{{BACK}}</button>
  </div>
</template>

<script>
import SheetComponent from "../components/SheetComponent.vue";
import {BUTTONS,MESSAGES,LOCALSTORAGE} from "../Commons/Constants"
import { mapState } from "vuex";
import store from "../Store/Store";
import router from '@/router';
export default {
  components: { SheetComponent },
  name: "Stocks",
  data : () =>({
  MESSAGES:MESSAGES.NO_STOCKS,
  BACK:BUTTONS.BACK
  }),
  computed: {
    ...mapState({
      stockData: (state) => state.stockData,
    }),
  },
  methods: {
    sellItemHandler(item) {
      const stockValues = this.stockData;
      const index = stockValues.indexOf(item);
      if (index > -1) {
        stockValues.splice(index, 1);
      }
      localStorage.setItem(LOCALSTORAGE.BOUGHT_ITEMS, JSON.stringify(stockValues));
      store.commit("updateStockData", stockValues);
    },
     backItem(){
    router.push('/portfolio')
  }
  },
};
</script>

<style scoped>
.card {
  border-radius: 0.3rem;
  margin-top: 3%;
  box-shadow: #333;
}
.Stocks-card {
  background-color: #f5f5f5;
  padding: 1%;
  font-family: monospace;
}
.portfolio-subcard {
  border-radius: 0.3rem;
  border: 1px solid #0fa774;
  margin-left: 5%;
  margin-top: 3%;
}
.NoData {
  display: flex;
  margin-top: 15%;
  margin-left: 35%;
  font-size: 1.2rem;
  font-weight: 700;
  font-family: monospace;
}
.button {
  background: #59b0f8;
  border: 0;
  padding: 10px 20px;
  color: white;
  border-radius: 20px;
  margin-top: 15px;
  margin-left: 43%;
  font-family: monospace;
  margin-bottom: 23px;
}
.stocksDiv{
  height: 100%;
}
</style>