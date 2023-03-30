<template>
  <v-app id="inspire">
    <v-main class="bg-grey-lighten-2">
      <v-sheet rounded="lg" class="card">
        <FlowChart />
      </v-sheet>
    </v-main>
  </v-app>
</template>

<script>
import { defineComponent } from 'vue';
import FlowChart from '../components/FlowChartComponent.vue';

export default defineComponent({
  name: 'HomeView',
  components: { FlowChart },
});
</script>

<style scoped>
.card {
  text-align: center;
  border-radius: 0.3rem;
  box-shadow: #333;
}

.card-heading {
  font-family: "Material Design Icons";
  line-height: 1.42857143;
  color: #333;
}

hr {
  margin-top: 20px;
  margin-bottom: 20px;
  border: 0;
  border-top: 2px solid #337ab7 !important;
}
</style>
