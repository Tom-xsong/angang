let echarts = require('echarts');



//折线图
export function brokenLine(el) {
    
    console.log(el)
    var myChart = echarts.init(el);

   


    let option = {
        color: ["#0F7AE9", "#00FF84", "#FF862C"],
        
       
        legend: {
            x: "150px",
            // y: 'top',
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

            left: '0%',
            right: '0%',
            bottom: '10%',
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
                    color: "#ccc"

                },
                type: 'category',
                boundaryGap: false,
                data: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00']
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
                    color: "#1183F8"
                }

            },


            axisLabel: {
                color: "#ccc"

            },

            splitLine: {
                lineStyle: {
                    color: "#1183F8",
                    width:"0.5"
                }
            },


        },
        series: [{
            name: 'Tfe',
            type: 'line',

            data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
            name: 'R',
            type: 'line',

            data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
            name: 'FeO',
            type: 'line',
            data: [150, 232, 201, 154, 190, 330, 410]
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
       
    color:["#0F7AE9","#0BCDFF","#00FF84","#FF862C"],
   
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
            radius: ['45%', '50%'],
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
                    color:"#fff",
                    fontWeight: 'bold'
                }
            },
            labelLine: {
                show: false
            },
            data: [
                {value: 14, name: '14%', selected: true},
                {value: 34, name: '34%', selected: true},
                {value: 23, name: '23%', selected: true},
                {value: 33, name: '33%', selected: true},
               
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
                color: "#ccc"

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
                color: "#ccc"

            },

            splitLine: {
                lineStyle: {
                    color: "#1183F8",
                    width:"0.5"
                }
            }
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