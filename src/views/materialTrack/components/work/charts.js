let echarts = require('echarts');


//柱形图
export  function barChart(el,data) {
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
            x: "200px",
            y: 'top',
            itemWidth: 10,
            itemHeight: 10,
            orient: 'horizontal',
            itemGap: 30,
            textStyle: {
                color: '#CCC', // 图例文字颜色

            }
        },



        grid: {
            top:20,
            left: 5,
            right: '0%',
            bottom: '10%',
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


            data: xData,



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