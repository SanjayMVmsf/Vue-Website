<template>
  <div class="alert" v-if="visibleAlert">
    <p>{{ message }}</p>
    <button type="button" class="close" @click="close">{{ OK }}</button>
  </div>
</template>

<script>
import { BUTTONS } from '../Commons/Constants.ts';

export default {
  name: 'AlertComponent',
  props: ['message', 'visible'],
  data() {
    return {
      visibleAlert: this.visible,
      OK: BUTTONS.OK,
    };
  },
  methods: {
    close() {
      this.visibleAlert = !this.visibleAlert;
    },
  },
};
</script>

<style>
.alert {
  padding: 15px;
  margin-bottom: 20px;
  border: 1px solid transparent;
  border-radius: 4px;
  color: #721c24;
  background-color: #f8d7da;
  border-color: #f5c6cb;
  font-family: monospace;
  border-radius: 20px;
}

.close {
  float: right;
  font-size: 21px;
  font-weight: bold;
  line-height: 0;
  color: #000;
  text-shadow: 0 1px 0 #fff;
  opacity: 0.5;
  cursor: pointer;
  font-family: monospace;
}
.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  opacity: 0.75;
}
</style>
