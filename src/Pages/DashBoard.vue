<template>
  <div v-if="showAlert">
    <AlertComponent :message="message" :visible="true" />
  </div>
  <div class="dashboard-div">
    <TableComponent :data="data" />
  </div>
  <button class="button" @click="proceedItem">{{ PROCEED }}</button>
</template>

<script>
import TableComponent from "@/components/TableComponent.vue";
import AlertComponent from "@/components/AlertComponent.vue";
import store from "../Store/Store";
import router from "@/router";
import { mapState } from "vuex";
import { SYMBOLS, MESSAGES, BUTTONS } from "../Commons/Constants";
export default {
  components: { TableComponent, AlertComponent },
  name: "DashBoard",
  data() {
    return {
      symbols: SYMBOLS,
      data: [],
      showAlert: false,
      message: MESSAGES.NO_RESPONSE,
      PROCEED: BUTTONS.PROCEED,
    };
  },
  methods: {
    fetchMarketData() {
      this.symbols.forEach((symbol) => {
        fetch(
          `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=SRKKABS9IFFCA6WG`
        )
          .then((response) => response.json())
          .then((dataresponse) => {
            if (dataresponse) {
              const globalQuote = dataresponse["Global Quote"];
              const index = this.data.findIndex(
                (item) => item.symbol === globalQuote["01. symbol"]
              );
              if (index >= 0) {
                this.data[index] = {
                  symbol: globalQuote["01. symbol"],
                  open: parseFloat(globalQuote["02. open"]).toFixed(2),
                  high: parseFloat(globalQuote["03. high"]).toFixed(2),
                  low: parseFloat(globalQuote["04. low"]).toFixed(2),
                  price: parseFloat(globalQuote["05. price"]).toFixed(2),
                  volume: globalQuote["06. volume"],
                  latestTradingDay: globalQuote["07. latest trading day"],
                  previousClose: parseFloat(
                    globalQuote["08. previous close"]
                  ).toFixed(2),
                  change: parseFloat(globalQuote["09. change"]).toFixed(2),
                  changePercent: globalQuote["10. change percent"],
                };
              } else {
                this.data.push({
                  symbol: globalQuote["01. symbol"],
                  open: parseFloat(globalQuote["02. open"]).toFixed(2),
                  high: parseFloat(globalQuote["03. high"]).toFixed(2),
                  low: parseFloat(globalQuote["04. low"]).toFixed(2),
                  price: parseFloat(globalQuote["05. price"]).toFixed(2),
                  volume: globalQuote["06. volume"],
                  latestTradingDay: globalQuote["07. latest trading day"],
                  previousClose: parseFloat(
                    globalQuote["08. previous close"]
                  ).toFixed(2),
                  change: parseFloat(globalQuote["09. change"]).toFixed(2),
                  changePercent: globalQuote["10. change percent"],
                });
              }
              store.commit("updateResponseValues", [
                ...store.state.responseData,
                this.data,
              ]);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      });
    },
    proceedItem() {
      if (this.responseData && this.responseData.length != 0) {
        router.push("/portfolio");
      } else {
        this.showAlert = true;
      }
    },
  },
  mounted() {
    setInterval(() => {
      this.fetchMarketData();
    }, 5000);
  },
  computed: {
    ...mapState({
      responseData: (state) => state.responseData,
      checkedValues: (state) => state.checkedValues,
    }),
  },
};
</script>

<style scoped>
.dashboard-div {
  overflow-x: scroll;
  height: 516px;
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
</style>