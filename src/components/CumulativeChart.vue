<template>
  <div class='chart d-flex align-items-start justify-content-center' style="height: 100vh;">
    <div style="height: 60%; margin-top: 30px;">
      <Line :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>

<script>
import utils from '@/js/utils';
import 'chartjs-adapter-luxon';
import { toRaw } from 'vue';
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
} from 'chart.js'

ChartJS.register(TimeScale, LinearScale, PointElement, LineElement, Title, Tooltip)

export default {
  name: 'LineChart',
  components: {
    Line
  },
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  computed: {
    dateCounts() {
      return toRaw(this.data).reduce((acc, item) => {
        const startOfDayTimestamp = utils.getStartOfDayTimestamp(item.timestamp);

        acc[startOfDayTimestamp] || (acc[startOfDayTimestamp] = []);
        acc[startOfDayTimestamp].push(item);

        return acc;
      }, {});
    },

    // 累積度数分布を計算する関数
    cumulativeData() {
      let cumulativeCount = 0;
      return Object.keys(this.dateCounts).map(date => {
        cumulativeCount += this.dateCounts[date].length;
        return {
          x: parseInt(date, 10),
          y: cumulativeCount
        };
      });
    },
    // 日付ごとに集計した累積度数分布を作成
    chartData() {
      return {
        datasets: [
          {
            label: `Total: ${this.cumulativeData.at(-1).y}`,
            backgroundColor: '#f87979',
            borderColor: '#f87979',
            data: this.cumulativeData
          }
        ]
      };
    },
    chartOptions() {
      return {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            type: 'time',
            title: {
            },
          },
          y: {
            title: {
              display: false,
            },
            beginAtZero: true,
          }
        },
        plugins: {
          title: {
            display: true,
            text: `Total: ${this.cumulativeData.at(-1).y}`,
            position: 'top',
            font: { size: 20 }
          }
        }
      };
    }
  }
}
</script>

<style scoped>
canvas {
  width: 100%;
  height: 400px;
}

.chart {
  margin: auto;
}
</style>
