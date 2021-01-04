let echarts = require('echarts');


//柱形图
export  function barChart(el,data) {
    let xData,num
   if(data){
    xData = data.x
    num = data.data.y

   }else{
    xData =  [],
    num = []

   }

   

    console.log(xData)
    console.log(num)
    var myChart = echarts.init(el);




    let option = {
        
        color: ["#0F7AE9","#0BCDFF"],

      

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

                color: "#FFF"

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
                color: "#FFF"
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
                color: "#FFF"

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
                data: num
            },







        ]
    };


    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);


}