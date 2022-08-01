<template>
  <div>
    <!-- <h1>欢迎访问大学生创业管理系统</h1> -->

    <!-- <div id="main"></div>
    <div id="main1"></div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {
    this.demo();
    this.demo1();
  },
  methods: {
    demo() {
      var myChart = this.echarts.init(document.getElementById("main"));
      // 绘制图表
      myChart.setOption({
        title: {
          text: "ECharts 入门示例",
        },
        tooltip: {},
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20],
          },
        ],
      });
    },
    demo1() {
      var myChart1 = this.echarts.init(document.getElementById("main1"));
      // 绘制图表
      myChart1.setOption({
        title: {
          text: "成员管理分布",
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "left",
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: "50%",
            data: [
              { value: 1048, name: "班主任" },
              { value: 735, name: "教师" },
              { value: 580, name: "就业学员" },
              { value: 484, name: "在读学员" },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(255, 255, 255)",
              },
            },
          },
        ],
      });
    },
  },
};
</script>

<style scoped>
h1 {
  text-align: center;
}
#main {
  width: 300px;
  height: 300px;
}
#main1 {
  width: 450px;
  height: 450px;
  position: absolute;
  left: 400px;
  top: 80px;
}
</style>
