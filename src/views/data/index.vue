<template>
  <div>
    <div id="report" style="width: 100%;height: 500px; margin-top:20px"></div>
  </div>
</template>

<script>
import { onMounted } from "@vue/composition-api";
var echarts = require("echarts");
export default {
  name: "",
  setup(props) {
    onMounted(() => {
      useEcharts();
    });
    const useEcharts = () => {
      //init
      var myChart = echarts.init(document.getElementById("report"));
      //option

      var option = {
        title: {
          text: "信息统计情况",
          subtext: "纯属虚构",
          left: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          //orient: "vertical",
          left: "center",
          bottom: 0,
          data: ["国际", "国内", "社会", "军事", "体育", "娱乐"]
        },
        series: [
          {
            name: "信息分类",
            type: "pie",
            radius: "65%",
            center: ["50%", "55%"],
            selectedMode: "single",
            data: [
              {
                value: 335,
                name: "国际",
                label: {
                  // 在文本中，可以对部分文本采用 rich 中定义样式。
                  // 这里需要在文本中使用标记符号：
                  // `{styleName|text content text content}` 标记样式名。
                  // 注意，换行仍是使用 '\n'。
                  formatter: [
                    "{title|{b}}{abg|}",
                    "{cateHead|二级分类}{valueHead|数量}{rateHead|占比}",
                    "{hr|}",
                    "{cate|NBA}{value|35}{rate|20%}",
                    "{cate|CBA}{value|85}{rate|50%}",
                    "{cate|英超}{value|45}{rate|30%}"
                  ].join("\n"),

                  // 这里是文本块的样式设置：
                  backgroundColor: "#eee",
                  borderColor: "#777",
                  borderWidth: 1,
                  borderRadius: 4,
                  // rich 里是文本片段的样式设置：
                  rich: {
                    title: {
                      color: "#eee",
                      align: "center"
                    },
                    abg: {
                      backgroundColor: "#333",
                      width: "100%",
                      align: "right",
                      height: 30,
                      borderRadius: [4, 4, 0, 0]
                    },
                    hr: {
                      borderColor: "#777",
                      width: "100%",
                      borderWidth: 0.5,
                      height: 0
                    },
                    cate: {
                      color: "#333",
                      height: 23,
                      width: 20,
                      padding: [0, 10, 0, 25],
                      align: "right"
                    },
                    cateHead: {
                      height: 28,
                      color: "#333",
                      width: 20,
                      padding: [0, 10, 0, 25],
                      align: "right"
                    },
                    value: {
                      width: 20,
                      padding: [0, 20, 0, 30],
                      align: "left"
                    },
                    valueHead: {
                      color: "#333",
                      width: 20,
                      padding: [0, 20, 0, 30],
                      align: "center"
                    },
                    rate: {
                      width: 40,
                      align: "right",
                      padding: [0, 10, 0, 0]
                    },
                    rateHead: {
                      color: "#333",
                      width: 40,
                      align: "center",
                      padding: [0, 10, 0, 0]
                    }
                  }
                }
              },
              { value: 1145, name: "国内" },
              { value: 234, name: "社会" },
              { value: 135, name: "军事" },
              { value: 252, name: "体育" },
              { value: 415, name: "娱乐" }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 5,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };
      //setOption
      myChart.setOption(option);
    };

    return {
      useEcharts
    };
  }
};
</script>

<style scoped>
</style>