<template>
    <div id="main" style = "width: 100%;height: 400px;background: #fff">
    </div>
</template>
<script>
export default {
  name: 'earthMap',
  data () {
    return {
      newsList: {},
      myData: [
        {name: '鄂尔多斯', value: [109.781327, 39.608266, 120]},
        {name: '北京', value: [116.46, 39.92, 44]},
        {name: '徐州', value: [117.2, 34.26, 44]},
        {name: '包头', value: [110, 40.58, 22]},
        {name: '绵阳', value: [104.73, 31.48, 55]},
        {name: '乌鲁木齐', value: [87.68, 43.77, 87]},
        {name: '枣庄', value: [117.57, 34.86, 120]},
        {name: '杭州', value: [120.19, 30.26, 112]},
        {name: '鞍山', value: [122.85, 41.12, 66]},
        {name: '溧阳', value: [119.48, 31.43, 90]},
        {name: '开封', value: [114.35, 34.79, 65]}
      ],
      option: {}
    }
  },
  created () {

  },
  mounted () {
    this.gatEchartsData()
  },
  methods: {
    gatEchartsData: function () {
      this.$http.get('api/goods').then((response) => {
        // console.log(response)
        this.newsList = response.data.data
        this.$echarts.registerMap('china', this.newsList)
        this.drawLine()
      }).catch((response) => {
        console.log(response)
      })
    },
    drawLine: function () {
      console.log(this.newsList)
      // this.$echarts.registerMap('china', this.newsList)
      let mychart = this.$echarts.init(document.getElementById('main'))
      console.log(mychart)
      this.option = {
        geo: {
          map: 'china',
          show: true,
          grid: {
            top: '20px',
            right: '20px',
            bottom: '20px',
            left: '20px'
          },
          itemStyle: {// 定义样式
            normal: {// 普通状态下的样式
              areaColor: '#323c48',
              borderColor: '#111'
            },
            emphasis: {
              // 高亮状态下的样式
              show: false,
              areaColor: '#323c48',
              shadowColor: 'rgba(0, 0, 0, 0.5)',
              shadowBlur: 10
            }
          },
          label: {
            normal: {
              // 静态的时候展示样式
              show: false,
              // 是否显示地图省份得名称
              textStyle: {
                color: '#fff',
                fontSize: 5,
                fontFamily: 'Arial'
              }
            },
            emphasis: {
              // 动态展示的样式
              show: false
            }
          }
        },
        backgroundColor: '#404a59',
        // 图表背景色
        series: [
          {
            name: '机构合作数量', // series名称
            type: 'effectScatter', // series图表类型
            coordinateSystem: 'geo', // series坐标系类型
            symbolSize: function (data) {
            //  console.log(data[2])
              return data[2] / 20
            },
            label: {
              normal: {
                formatter: function (parames) {
                  // console.log(parames)
                  return '' + parames.name + ':' + parames.data.value[2]
                },
                position: 'top',
                show: false
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: 14,
                  fontFamily: 'Arial',
                  fontWeight: 400,
                  zIndex: 10000
                }
              }
            },
            data: this.myData
          }
        ],
        visualMap: {
          type: 'continuous', // 连续型
          min: 0, // 值域最小值，必须参数
          max: 120, // 值域最大值，必须参数
          calculable: true, // 是否启用值域漫游
          inRange: {
            color: ['green', 'yellow']
            // 指定数值从低到高时的颜色变化
          },
          textStyle: {
            color: '#fff'// 值域控件的文本颜色
          }
        }
      }
      console.log(this.newsList)
      mychart.setOption(this.option)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
