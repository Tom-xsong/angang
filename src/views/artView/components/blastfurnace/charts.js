let echarts = require('echarts');








//饼状图
export function pieChart(el) {

    console.log(el)
    var myChart = echarts.init(el);




    let option = {

        color: ["#0F7AE9", "#0BCDFF", "#00FF84", "#FF862C"],


        legend: {
            orient: 'vertical',
            left: 10,
            data: ['直接访问', '邮件营销', '联盟广告', '视频广告']
        },
        series: [
            // {       
            //         name: '访问来源',
            //         type: 'pie',
            //         selectedMode: 'single',
            //         radius: [0, '30%'],

            //         label: {
            //             show:false
            //         },
            //         labelLine: {
            //             show: false
            //         },
            //         data: [
            //             {value: 335, name: '直达'},
            //         ]
            //     },


            {
                name: '访问来源',
                type: 'pie',
                radius: ['55%', '70%'],
                // avoidLabelOverlap: false,
                // selectedMode: 'single',
                selectedOffset: 3,



                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: '20',
                        color: "#fff",
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: [
                    { value: 14, name: '14%', selected: true },
                    { value: 34, name: '34%', selected: true },
                    { value: 23, name: '23%', selected: true },
                    { value: 33, name: '33%', selected: true },

                ]
            }
        ]

    };


    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);


}










//柱状图
export function barChart(el) {

    console.log(el)
    var myChart = echarts.init(el);




    let option = {

        color: ["#0F7AE9", "#00FF84", "#FF862C"],

        // 图例
        legend: {
            x: "100px",
            itemWidth: 10,
            itemHeight: 10,
            itemGap: 30,
            data: ["库存量", "入库量", "出库量"],
            textStyle: {
                color: '#CCC', // 图例文字颜色

            }
        },


        grid: {
            top: 30,
            left: '0%',
            right: '0%',
            bottom: '10%',
            show: true,
            containLabel: true,
            backgroundColor: 'rgba(0,0,0)',
            borderWidth: 0,



        },



        xAxis: {
            axisTick: {
                show: false
            },

            axisLine: {
                lineStyle: {
                    color: "#1183F8"
                }

            },



            axisLabel: {
                color: "#ccc",
                fontSize: 10

            },


            data: ["12/05", "12/06", "12/07", "12/08", "12/09", "12/10", "12/11"],


        },





        yAxis: {

            nameTextStyle: {
                color: "#CCC"
            },
            name: "单位(t)",

            axisTick: {
                show: false
            },

            axisLine: {

                lineStyle: {
                    color: "#1183F8",
                }

            },


            axisLabel: {
                color: "#ccc",
                fontSize: 10

            },

            splitLine: {
                lineStyle: {
                    color: "#1183F8",
                    width: "0.5"
                }
            },


        },
        series: [{
            name: '库存量',
            type: 'bar',
            barWidth: 10,
            stack: '总量',
            data: [5, 20, 36, 10, 10, 20, 15]
        },



        {
            name: '入库量',
            type: 'bar',
            stack: '总量',
            data: [5, 20, 36, 10, 10, 16, 12]
        },

        {
            name: '出库量',
            type: 'bar',
            stack: '总量',
            data: [5, 20, 36, 10, 10, 20, 12]
        },
        ]

    };


    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);

}




//阶梯柱状图
export function ladderBarChart(el) {

    console.log(el)
    var myChart = echarts.init(el);




    let option = {

        color: ["#0F7AE9", "#0BCDFF"],



        legend: {
            x: 120,
            y: 6,
            itemWidth: 10,
            itemHeight: 10,
            orient: 'horizontal',
            itemGap: 10,
            textStyle: {
                color: '#CCC', // 图例文字颜色

            },
            data: ['铁', '渣']
        },
        grid: {
            left:0,
            top:40,
            right:0,
            bottom:20,
            show: true,
            containLabel: true,
            borderWidth: 0,


        },



        xAxis: {
            type: "value",
            axisTick: {
                show: false
            },

            axisLine: {
                lineStyle: {
                    color: "#1183F8"
                }

            },



            axisLabel: {
                color: "#ccc"

            },
            splitLine: {
                lineStyle: {
                    show: true,
                    color: "#1183F8",
                    width: 0.5
                }
            },



        },





        yAxis: {
            type: "category",

            axisTick: {
                show: false
            },

            axisLine: {

                lineStyle: {
                    color: "#1183F8"
                }

            },


            axisLabel: {
                color: "#ccc"

            },


            splitLine: {
                lineStyle: {
                    show: true,
                    color: "#1183F8",
                    width: 0.5
                }
            },



            data: ["04:00", "08:00", "12:00", "16:00", "20:00", "24:00"],
        },
        series: [{
            name: '辅助',
            type: 'bar',
            stack: '总量',
            itemStyle: {
                barBorderColor: 'rgba(0,0,0,0)',
                color: 'rgba(0,0,0,0)'
            },
            emphasis: {
                itemStyle: {
                    barBorderColor: 'rgba(0,0,0,0)',
                    color: 'rgba(0,0,0,0)'
                }
            },
            data: [0, 900, 1000, 1530, 1376, 1376]
        },
        {
            name: '铁',
            type: 'bar',
            stack: '总量',
            barWidth: 10,
            data: [354, 345, 393, 434, 222, 456]
        },
        {
            name: '渣',
            type: 'bar',
            stack: '总量',
            barWidth: 10,
            data: [67, 100, 344, 108, 154, 112]
        }
        ]

    };


    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);

}




//雷达图
export function radarChart(el) {

    console.log(el)
    var myChart = echarts.init(el);

    




    let option = {




        


        radar: {

            radius: 70,

            name: {
                textStyle: {
                    fontSize: 16,

                }
            },

            axisLine: { // (圆内的几条直线)坐标轴轴线相关设置
                lineStyle: {
                    color: '#0F7AE9',

                    width: 1,

                    type: 'solid',
                    opacity: 0.5

                }
            },

            splitLine: {
                lineStyle: {
                    color: '#0F7AE9',
                    opacity: 0.5,

                    width: 1,

                }
            },


            splitArea: {
                show: true,
                areaStyle: {
                    color: ['rgba(250,250,250,0)', 'rgba(200,200,200,0)'],

                }
            },


            indicator: [
                { name: 'TM', max: 6500 },
                { name: 'SI', max: 16000 },
                { name: 'S', max: 30000 },
                { name: 'MN', max: 38000 },
                { name: 'P', max: 52000 },
                { name: 'Cu', max: 25000 },
                { name: 'Ti', max: 25000 },
                { name: 'As', max: 25000 }
            ]
        },
        series: [{
            type: 'radar',
            symbol: 'none',
            lineStyle: {
                normal: {
                    color: "rgba(0,0,255)",
                    opacity: 0.5
                }
            },


            areaStyle: {
                normal: {
                    color: 'rgba(0,0,255,0.6)'
                }
            },
            data: [
                {
                    value: [4300, 10000, 28000, 35000, 50000, 19000],
                    name: "铁渣质量"
                },

            ]
        }]
    };



    myChart.setOption(option);

}








