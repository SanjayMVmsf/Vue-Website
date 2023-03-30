<template>
  <div class="tradingview-widget-container" style="height: 500px; width: 100%;">
    <div id="tradingview_50a63" style="height: 500px; width: 100%;" />
  </div>
</template>

<script>
import { ref } from 'vue';

let tvScriptLoadingPromise;
export default {
  name: 'chartsView',
  data() {
    return {
      onLoadScriptRef: ref(this.createWidget),
    };
  },
  mounted() {
    this.onLoadScriptRef.value = this.createWidget;
    if (!tvScriptLoadingPromise) {
      tvScriptLoadingPromise = new Promise((resolve) => {
        const script = document.createElement('script');
        script.id = 'tradingview-widget-loading-script';
        script.src = 'https://s3.tradingview.com/tv.js';
        script.type = 'text/javascript';
        script.onload = resolve;

        document.head.appendChild(script);
      });
    }
    tvScriptLoadingPromise.then(
      () => this.onLoadScriptRef.value && this.onLoadScriptRef.value(),
    );
  },
  methods: {
    createWidget() {
      if (
        document.getElementById('tradingview_50a63') && 'TradingView' in window
      ) {
        new window.TradingView.widget({  // eslint-disable-line
          autosize: true,
          symbol: 'NASDAQ:AAPL',
          interval: 'D',
          timezone: 'Etc/UTC',
          theme: 'light',
          style: '1',
          locale: 'en',
          toolbar_bg: '#f1f3f6',
          enable_publishing: false,
          allow_symbol_change: true,
          container_id: 'tradingview_50a63',
        });
      }
    },
  },
};
</script>

<style>
.tradingview-widget-container {
  border: 3px solid #0fa774;
  border-radius: 4px;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
}
</style>
