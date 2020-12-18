let echarts = require('echarts');



//折线图
export function brokenLine(el) {

    console.log(el)
    var myChart = echarts.init(el);
    let option = {
        color: ["#0F7AE9", "#00FF84", "#FF862C"],


        legend: {
            x: 100,
            top:10,
            itemWidth: 4,
            itemHeight: 4,
            orient: 'horizontal',
            itemGap: 30,
            data: ["Tfe", "R", "FeO"],
            textStyle: {
                color: '#CCC', // 图例文字颜色
            }
        },
        grid: {
            top:40,
            left: '0%',
            right: '0%',
            bottom: 20,
            show: true,
            containLabel: true,
            borderWidth: 0,
        },

        xAxis: {
            gridIndex: 0,

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
                fontSize :10

            },
            type: 'category',
            boundaryGap: false,
            data: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00']
        },

        yAxis:[{
            nameTextStyle: {
                color: "#CCC"
            },
            name: "单位(t)",

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
                fontSize :10

            },

            splitLine: {
                lineStyle: {
                    color: "#1183F8",
                    width: "0.5"
                }
            },


        },{

            nameTextStyle: {
                color: "#CCC"
            },
            name: "单位2(t)",

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
                fontSize :10

            },

            splitLine: {
                lineStyle: {
                    color: "#1183F8",
                    width: "0.5",
                }
            },

            data: ["0%", "25%", "50%", "75%", "100%"]


        }] ,


        series: [{
            name: 'Tfe',
            type: 'line',

            data: [23, 45, 13, 56, 65, 33, 45]
        },
        {
            name: 'R',
            type: 'line',

            data: [23, 33, 33, 56, 44, 56, 78]
        },
        {
            name: 'FeO',
            type: 'line',
            data: [23, 45, 45, 33, 67, 44, 91]
        },


        ]
    };




    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);


}





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
            top:30,
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
                fontSize :10

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
                fontSize :10

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


//单项柱状图
export function barChart1(el) {

    console.log(el)
    var myChart = echarts.init(el);




    let option = {

        color: ["#0F7AE9"],



        grid: {
            show: true,
            left:0,
            right:0,
            top:40,
            bottom:0,
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
                fontSize :10

            },


            data: ["04:00", "08:00", "12:00", "16:00", "20:00", "24:00"],


        },





        yAxis: [{

            nameTextStyle: {
                color: "#CCC"
            },
            name: "单位(t)",

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
                fontSize :10

            },

            splitLine: {
                lineStyle: {
                    color: "#1183F8",
                    width: "0.5",
                }
            }


        },





        {

            nameTextStyle: {
                color: "#CCC"
            },
            name: "单位2(t)",

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
                fontSize :10

            },

            splitLine: {
                lineStyle: {
                    color: "#1183F8",
                    width: "0.5",
                }
            },

            data: ["0%", "25%", "50%", "75%","100%"]


        },
        ],

        series: [{
            name: '直接访问',
            type: 'bar',
            barWidth: "14px",
            yAxisIndex: "0",
            data: [80, 65, 40, 35, 60, 88]
        }]

    };


    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);

}










