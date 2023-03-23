<template>
<div v-if="tableValues.length != 0 ">
  <table>
    <thead>
      <tr>
        <th v-for="item in DASHBOARD_TABLE_TH" :key="item">{{item}}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in tableValues" :key="item.symbol">
        <td>{{ item.symbol }}</td>
        <td :class="valueChangeClass(item.open, item.symbol)">
          {{ item.open }}
        </td>
        <td :class="valueChangeClass(item.high, item.symbol)">
          {{ item.high }}
        </td>
        <td :class="valueChangeClass(item.low, item.symbol)">{{ item.low }}</td>
        <td>{{ item.price }}</td>
        <td>{{ item.volume }}</td>
        <td>{{ item.latestTradingDay }}</td>
        <td>{{ item.previousClose }}</td>
        <td :class="valueChangeClass(item.change, item.symbol)">
          {{ item.change }}
        </td>
        <td :class="valueChangeClass(item.changePercent, item.symbol)">
          {{ item.changePercent }}
        </td>
        <td>
          <label>
            <input
              type="checkbox"
              :id="'checkbox-' + item.symbol"
              :checked="selectedItems.map(i => i.symbol).includes(item.symbol)" @change="onRowSelected(item)"
            />
            Checkout
          </label>
        </td>
      </tr>
    </tbody>
  </table>
</div>
<div class="NoData" v-else>Loading....</div>
</template>

<script>
import store from "../Store/Store";
import {DASBOARD_TABLE_HEADINGS,LOCALSTORAGE,DASHBOARD_TABLE_TH} from '../Commons/Constants'
import { mapState } from "vuex";
export default {
  name: "TableComponent",
  props: ["data"],
  data() {
    return {
      previousValues: {},
      isChecked: false,
      checkedValues: [],
      tableValues: [],
      checkedItems: [],
      selectedItems: [],
      DASHBOARD_TABLE_TH:DASHBOARD_TABLE_TH
    };
  },
  methods: {
    valueChangeClass(value, symbol) {
      var previousValue = "";
      var currentValue = "";
      if (value == DASBOARD_TABLE_HEADINGS.OPEN) {
        previousValue = parseFloat(this.previousValues[symbol]?.open);
      } else if (value == DASBOARD_TABLE_HEADINGS.CHANGE) {
        previousValue = parseFloat(this.previousValues[symbol]?.change);
      } else if (value == DASBOARD_TABLE_HEADINGS.HIGH) {
        previousValue = parseFloat(this.previousValues[symbol]?.high);
      } else if (value == DASBOARD_TABLE_HEADINGS.LOW) {
        previousValue = parseFloat(this.previousValues[symbol]?.low);
      }
      currentValue = parseFloat(value);
      if (previousValue !== undefined && previousValue !== currentValue) {
        return {
          "positive-change": currentValue > previousValue,
          "negative-change": currentValue < previousValue,
        };
      }
    },
    onRowSelected(item) {
      const index = this.selectedItems.findIndex((selectItem) => selectItem.symbol === item.symbol)
      if (index > -1) {
        this.selectedItems.splice(index, 1);
      } else {
        this.selectedItems.splice(index, 0, item);
      }
      localStorage.setItem(LOCALSTORAGE.SELECTED_ITEMS, JSON.stringify(this.selectedItems));
      store.commit("updateCheckedValues", this.selectedItems);
    },
  },
  watch: {
    data: {
      handler(newVal) {
        newVal.forEach((item) => {
          if (this.previousValues[item.symbol] === undefined) {
            this.previousValues[item.symbol] = {};
          }
          this.previousValues[item.symbol].previousClose = item.previousClose;
          this.previousValues[item.symbol].change = item.change;
        });
      },
      deep: true,
    },
  },
  computed: {
    ...mapState({
      responseData: (state) => state.responseData,
      checkedValues: (state) => state.checkedValues,
    }),
  },
  mounted() {
    if (this.responseData && this.responseData.length != 0) {
      this.tableValues = this.responseData[this.responseData.length - 1];
    } else {
      this.tableValues = this.data;
    }

    let storedSelectedItems = localStorage.getItem(LOCALSTORAGE.SELECTED_ITEMS);
    if (storedSelectedItems) {
      this.selectedItems = JSON.parse(storedSelectedItems);
    }
  },
};
</script>

<style  scoped>
th,
td {
  border-top: 1px solid rgba(224, 224, 224, 1);
  font-weight: bold !important;
  white-space: nowrap;
  padding-left: 0.9rem;
  padding-right: 1.5rem;
  padding-top: 1.75rem;
  padding-bottom: 1.75rem;
  font-size: 0.8rem;
  text-transform: uppercase;
  font-weight: 700;
   font-family: monospace
}

table {
  table-layout: fixed;
}
.positive-change {
  color: green;
}
.negative-change {
  color: red;
}
.value-changed td {
  background-color: #ffa07a;
}
table td:last-child {
  position: sticky;
  width: 7em;
  top: auto;
  right: -8px;
  background-color: #fff;
}

table th:last-child {
  position: sticky;
  width: 7em;
  top: auto;
  right: -8px;
  background-color: #f5f8fb;
}

.NoData{
  display: flex;
  margin-top: 15%;
  margin-left: 35%;
  font-size: 1.2rem;
  font-weight: 700;
   font-family: monospace
}
</style>

