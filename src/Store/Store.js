import Vuex from 'vuex';

const store = new Vuex.Store({
  state: {
    checkedValues: [],
    responseData:[],
    stockData:[]
  },
  mutations: {
    updateCheckedValues(state, checkedValues) {
      state.checkedValues = checkedValues;
    },
    updateResponseValues(state,responseValues){
        state.responseData = responseValues
    },
    updateStockData(state,stockData){
      state.stockData = stockData
  }
  },
});

export default store;