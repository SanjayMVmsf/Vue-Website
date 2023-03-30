<template>
  <v-sheet min-height="30vh" rounded="lg" class="portfolio-subcard" width="60%">
    <h5 class="card-title">{{title}} (Price : ${{price}})</h5>
    <p>
      <label for="Quntify" />
      <input type="text" id="Quntify" placeholder="Quantity" class="card-text" />
      <button type="button" v-if="buy" class="card-button" @click="buyItem">{{BUY}}</button>
      <button type="button" v-else class="card-button-sell" @click="sellItem">{{SELL}}</button>
    </p>
  </v-sheet>
</template>

<script>
import { BUTTONS } from '../Commons/Constants.ts';

export default {
  name: 'SheetComponent',
  props: ['title', 'price', 'buy', 'item'],
  data: () => ({
    BUY: BUTTONS.BUY,
    SELL: BUTTONS.SELL,
  }),
  methods: {
    buyItem() {
      this.$emit('buy-item', this.item);
    },
    sellItem() {
      this.$emit('sell-item', this.item);
    },
  },
};
</script>

<style scoped>
.card-title {
  font-size: 16px;
  margin: 4%;
}
.card-text {
  display: block;
  padding: 10px 6px;
  width: 50%;
  box-sizing: border-box;
  border: none;
  border-bottom: 3px solid #a7a409;
  color: #555;
  margin: 4%;
}

.card-button {
  background: #3be224;
  border: 0;
  padding: 10px 20px;
  color: white;
  border-radius: 20px;
  margin-top: 2px;
  margin: 4%;
  text-align: center;
}

.card-button-sell{
  background: #f34f4f;
  border: 0;
  padding: 10px 20px;
  color: white;
  border-radius: 20px;
  margin-top: 2px;
  margin: 4%;
  text-align: center;
}
</style>
