<!-- 评价分析 -->

<template>
  <q-page
    class="row items-center justify-center q-page-container"
    style="min-height: 650px"
  >
    <div ref="line" style="color: black; width: 400px; height: 400px"></div>
    <div ref="pie" style="color: black; width: 400px; height: 400px"></div>
  </q-page>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
// @ts-ignore
import request from "@/api/index";
import * as echarts from "echarts";

const line = ref(null);
let lineData = ref(null);

const pie = ref(null);
let pieData = ref(null);

onMounted(async () => {
  // 获取折线图数据
  const newLineData = await getLineData();
  lineData = newLineData;

  // 绘制折线图
  initLine(lineData);

  // 获取拼图数据
  const newPieData = await getPieData();
  pieData = newPieData;

  // 绘制饼图
  initPie(pieData);
});

// 绘制折线图
const initLine = (data) => {
  let myLine = echarts.init(line.value);
  myLine.setOption({
    title: {
      text: "各年平均分展示",
      left: "center",
    },
    xAxis: {
      data: Object.keys(data),
    },
    yAxis: {
      type: "value",
      min: 0, // 设置 y 坐标轴的最小值为 0
      max: 10, // 设置 y 坐标轴的最大值为 100
      interval: 2, // 设置 y 坐标轴的刻度间隔为 10
      axisLine: {
        show: true, // 设置为 true 显示 y 轴线，设置为 false 隐藏 y 轴线
      },
    },
    tooltip: {
      trigger: "item",
    },
    series: [
      {
        data: Object.values(data),
        type: "line",
        label: {
          show: true,
          position: "bottom",
          fontSize: 20,
        },
        lineStyle: {
          color: "blue",
          width: 4,
          type: "dashed",
        },
      },
    ],
  });
};

// 绘制饼图
const initPie = (data) => {
  let myPie = echarts.init(pie.value);

  // 转换数据
  const dataSeries = Object.keys(data).map((key) => {
    return { value: data[key], name: key };
  });

  myPie.setOption({
    title: {
      text: "各班级得分展示", // 标题文本
      left: "center", // 标题位置，可以是 'left', 'center', 'right'
    },

    legend: {
      orient: "vertical",
      x: "left",
      data: Object.keys(data),
    },
    tooltip: {
      trigger: "item",
    },
    series: [
      {
        name: "班级得分",
        type: "pie",
        label: {
          show: true,
        },
        labelLine: {
          show: true,
        },
        emphasis: {
          label: {
            show: true,
            fontSize: "30",
            fontWeight: "bold",
          },
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
        data: dataSeries,
      },
    ],
  });
};

// 获取线形图数据
const getLineData = async () => {
  const res = await request.get("/teacher/line");
  return res.data.data;
};

// 获取饼图数据
const getPieData = async () => {
  const res = await request.get("/teacher/pie");
  return res.data.data;
};
</script>
