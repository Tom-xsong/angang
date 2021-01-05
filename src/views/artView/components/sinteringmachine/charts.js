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
export function pieChart(el,data) {

   
    let chartData;

    if(data){
        chartData = data
    }
    else{
        chartData = []
    }


    var myChart = echarts.init(el);




    let option = {
        color: ["#0F7AE9", "#0BCDFF", "#00FF84", "#FF862C"],
        legend: {
            type:"scroll",
            pageIconColor:"#0F7AE9",
            pageIconInactiveColor:"#ccc",
            pageIconSize:10,
            pageTextStyle:{
                color:"#fff",
            },
            top:"10%",
            bottom:"10%",
            x: '60%',
            orient: 'vertical',
            borderRadius:9,
            itemWidth: 10, // 设置图例图形的宽
            itemHeight: 10, // 设置图例图形的高
            textStyle: {
                color: '#FFF' // 图例文字颜色
            },
            // itemGap设置各个item之间的间隔，单位px，默认为10，横向布局时为水平间隔，纵向布局时为纵向间隔
            itemGap: 5,
            formatter: function (name) {

                //百分比数据的计算

                var data = chartData;

                

                var target;

                for (var i = 0, l = data.length; i < l; i++) {

                   
                    if (data[i].name == name) {

                        target = data[i].value;

                    }

                }

                return name + ':'+" "+" "+ target + 'T';

            }


        },
        series: [
            


            {
                type: 'pie',
                center:["20%","50%"],
                radius: ['55%', '70%'],
                selectedMode: 'single',
                selectedOffset: 3,



                label: {
                    show: false,
                    position: 'center',
                    formatter: "{d}%",
                   
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: '10',
                        color: "#fff",
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: chartData
            }
        ]

    };


    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);


}










//柱状图
export function barChart(el,data) {
    let xData,num1,num2,num3;
   if(data.x){
    xData = data.x
    num1 = data.data.supply ;
    num2 = data.data.receive;
    num3 =  data.data.current

   }else{
    xData = [];
    num1 = [];
    num2 = [];
    num3 = [];

   }

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


            data: xData,


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
            data: num3
        },



        {
            name: '入库量',
            type: 'bar',
            stack: '总量',
            data: num2
        },

        {
            name: '出库量',
            type: 'bar',
            stack: '总量',
            data: num1
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



export  function newBarChart(el,data) {
    let xData,num1,num2;
   if(data.x){
    xData = data.x
    num1 = data.data.supply ;
    num2 = data.data.receive;

   }else{
    xData = [];
    num1 = [];
    num2 = [];

   }
   

    
    var myChart = echarts.init(el);




    let option = {
      
        color: ["#0F7AE9","#0BCDFF"],

        legend: {
            x:220,
            y:0,
            itemWidth: 10,
            itemHeight: 10,
            // orient: 'horizontal',
            itemGap: 30,
            textStyle: {
                color: '#CCC', // 图例文字颜色

            }
        },



        grid: {
            top:25,
            left: 5,
            right: '0%',
            bottom: 10,
            show: true,
            containLabel: true,
            backgroundColor: 'rgba(0,0,0)',
            borderWidth: 0,



        },

        dataZoom:{
            show:true, 
            type: 'inside',
            yAxisIndex:0     

        },



        xAxis: {

            type: "value",

            axisTick: {
                show: false
            },

            axisLine: {
                show: false,
                lineStyle: {
                    color: "#1183F8",

                }

            },



            axisLabel: {

                color: "#ccc"

            },


            splitLine: {
                show: false,
                lineStyle: {

                    color: "#1183F8",
                    width: "0.5",
                }
            },



        },





        yAxis: {
            type: 'category',
            position: "right",
            nameTextStyle: {
                color: "#CCC"
            },

            axisTick: {
                show: false
            },

            axisLine: {
                show: false,
                lineStyle: {
                    color: "#1183F8"
                }

            },


            axisLabel: {
                color: "#ccc"

            },

            splitLine: {
                show: false,
                lineStyle: {
                    color: "#1183F8",
                    width: "0.5",
                }
            },


            data:xData,



        },






        series: [{
                name: '供料',
                type: 'bar',
                barWidth: "10px",
                yAxisIndex: "0",
                stack: '总量',
                data: num1
            },

            {
                name: '受料',
                type: 'bar',
                barCap:10,
                barWidth: "10px",
                yAxisIndex: "0",
                stack: '总量',
                data: num2
            }






        ]
    };


    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);


}










