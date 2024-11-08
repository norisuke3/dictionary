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
import zoomPlugin from 'chartjs-plugin-zoom';

import {
  Chart as ChartJS,
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
} from 'chart.js'

ChartJS.register(TimeScale, LinearScale, PointElement, LineElement, Title, Tooltip, zoomPlugin)

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
    wordsByDay() {
      return this.data.reduce((acc, item) => {
        const startOfDayTimestamp = utils.getStartOfDayTimestamp(item.timestamp);

        acc[startOfDayTimestamp] || (acc[startOfDayTimestamp] = []);
        acc[startOfDayTimestamp].push(item);

        return acc;
      }, {});
    },

    // 累積度数分布を計算する関数
    cumulativeData() {
      let cumulativeCount = 0;
      return Object.keys(this.wordsByDay).map(date => {
        cumulativeCount += this.wordsByDay[date].length;
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
      const xMin = Math.min(...this.cumulativeData.map(d => d.x));
      const xMax = Math.max(...this.cumulativeData.map(d => d.x));
      const yMin = 0; // y 軸はゼロから始まるため
      const yMax = Math.max(...this.cumulativeData.map(d => d.y));

      const xRange = xMax - xMin;
      const yRange = yMax - yMin;

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
          },
          zoom: {
            pan: {
              enabled: true,
              mode: 'xy',
            },
            zoom: {
              pinch: {
                enabled: true,
              },
              wheel: {
                enabled: true,
              },
              mode: 'xy',
            },
            limits: { // Set pan limits to allow panning up to 10% beyond the chart's initial range.
              x: {
                min: xMin - xRange * 0.1,
                max: xMax + xRange * 0.1
              },
              y: {
                min: yMin - yRange * 0.1,
                max: yMax + yRange * 0.1
              }
            }
          },
          tooltip: {
            callbacks: {
              title: (tooltipItems) => {
                // ツールチップのタイトルとして日付のみを表示
                const date = tooltipItems[0].parsed.x;
                return new Date(date).toISOString().split('T')[0]; // "yyyy-MM-dd"形式
              },
              afterBody: (tooltipItems) => {
                const date = tooltipItems[0].parsed.x;
                const words = this.wordsByDay[date]?.map(item => item.word) || [];

                let currentLineLength = 0;
                const formattedLines = [];
                let currentLine = '';

                words.forEach((word, index) => {
                  // 次の単語を追加した場合に50文字を超えるか確認
                  if (currentLineLength + word.length + 2 > 50) {
                    // 現在の行を確定（最終行でなければカンマを追加）
                    formattedLines.push(currentLine + (index < words.length - 1 ? ',' : ''));
                    currentLine = ''; // 新しい行を開始
                    currentLineLength = 0;
                  }

                  // 単語を行に追加（行が空でない場合はカンマを付ける）
                  currentLine += (currentLine ? ', ' : '') + word;
                  currentLineLength += word.length + 2; // 単語の長さ + ", " の分
                });

                // 最後の行を追加
                if (currentLine) {
                  formattedLines.push(currentLine);
                }

                return formattedLines.length > 0 ? `Words:\n${formattedLines.join('\n')}` : '';
              }
            }
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
