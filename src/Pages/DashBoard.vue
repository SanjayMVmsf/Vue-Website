<template>
  <div v-if="showAlert">
    <AlertComponent :message="message" :visible="true" />
  </div>
  <div class="dashboard-div">
    <TableComponent :data="data" />
  </div>
  <button class="button" type="button" @click="proceedItem">{{ PROCEED }}</button>

</template>

<script>
/* eslint-disable */
import { ref } from 'vue';
import { mapState } from 'vuex';
import TableComponent from '../components/TableComponent.vue';
import AlertComponent from '../components/AlertComponent.vue';
import store from '../Store/Store';
import router from '@/router'; // eslint-disable-line
import { SYMBOLS, MESSAGES, BUTTONS, URL } from '../Commons/Constants.ts'

export default {
  components: { TableComponent, AlertComponent },
  name: 'DashBoard',
  data() {
    return {
      symbols: SYMBOLS,
      data: [],
      showAlert: false,
      message: MESSAGES.NO_RESPONSE,
      PROCEED: BUTTONS.PROCEED,
      onLoadScriptRef: ref(this.createWidget),
      FETCH_URL:URL.FETCH_URL,
      APIKEY:URL.APIKEY
    };
  },
    mounted() {
     setInterval(() => {
      this.fetchMarketData();
    }, 5000);
  },
  methods: {
    fetchMarketData() {
      this.symbols.forEach((symbol) => {
        fetch(`${this.FETCH_URL}${symbol}${this.APIKEY}`)
          .then((response) => response.json())
          .then((dataresponse) => {
            if (dataresponse) {
              const globalQuote = dataresponse['Global Quote'];
              const index = this.data.findIndex((item) => item.symbol === globalQuote['01. symbol']);
              if (index >= 0) {
                this.data[index] = {
                  symbol: globalQuote['01. symbol'],
                  open: parseFloat(globalQuote['02. open']).toFixed(2),
                  high: parseFloat(globalQuote['03. high']).toFixed(2),
                  low: parseFloat(globalQuote['04. low']).toFixed(2),
                  price: parseFloat(globalQuote['05. price']).toFixed(2),
                  volume: globalQuote['06. volume'],
                  latestTradingDay: globalQuote['07. latest trading day'],
                  previousClose: parseFloat(globalQuote['08. previous close']).toFixed(2),
                  change: parseFloat(globalQuote['09. change']).toFixed(2),
                  changePercent: globalQuote['10. change percent'],
                };}  // eslint-disable-line
              else  // eslint-disable-line
              {this.data.push({symbol: globalQuote['01. symbol'], // eslint-disable-line
                  open: parseFloat(globalQuote['02. open']).toFixed(2),
                  high: parseFloat(globalQuote['03. high']).toFixed(2),
                  low: parseFloat(globalQuote['04. low']).toFixed(2),
                  price: parseFloat(globalQuote['05. price']).toFixed(2),
                  volume: globalQuote['06. volume'],
                  latestTradingDay: globalQuote['07. latest trading day'],
                  previousClose: parseFloat(globalQuote['08. previous close'] ).toFixed(2),
                  change: parseFloat(globalQuote['09. change']).toFixed(2),
                  changePercent: globalQuote['10. change percent'],
                });
              }
              store.commit('updateResponseValues', [
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
      if (this.responseData && this.responseData.length !== 0) {
        router.push('/portfolio');
      } else {
        this.showAlert = true;
      }
    },
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
