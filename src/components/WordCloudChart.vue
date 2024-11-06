<template>
  <div>
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted, watch, computed, nextTick } from 'vue';
import { Chart } from 'chart.js';
import { WordCloudController, WordElement } from 'chartjs-chart-wordcloud';
import utils from '@/js/utils';

Chart.register(WordCloudController, WordElement);

export default {
  name: 'WordCloudChart',
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const chartCanvas = ref(null);
    let chartInstance = null;

    const words = computed(() => {
      const numberOfWords = 150;
      const latestData = props.data.slice(-numberOfWords).reverse();
      const values = utils.getDistribution(numberOfWords);

      return latestData
        .filter(item => item && item.word) // null チェックを追加
        .map((item, index) => ({
          key: item.word,
          value: values[index] || 1,
        }));
    });

    const createChart = async () => {
      await nextTick();
      if (chartInstance) {
        chartInstance.destroy();
        chartInstance = null;
      }
      if (chartCanvas.value && words.value.length) { // chartCanvas と words.value をチェック
        const chartConfig = {
          type: 'wordCloud',
          data: {
            labels: words.value.map((word) => word.key),
            datasets: [
              {
                label: '',
                data: words.value.map((word) => 10 + word.value * 10),
              },
            ],
          },
        };
        chartInstance = new Chart(chartCanvas.value, chartConfig);
      }
    };

    onMounted(async () => {
      await createChart();
    });

    watch(
      () => props.data,
      async () => {
        await createChart();
      },
      { immediate: true }
    );

    onUnmounted(() => {
      if (chartInstance) {
        chartInstance.destroy();
        chartInstance = null;
      }
    });

    return {
      chartCanvas,
      words,
    };
  },
};
</script>

<style scoped>
canvas {
  width: 100%;
  height: 400px;
}
</style>
