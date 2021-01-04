
let echarts = require('echarts');
//漏斗图



let ldcId;

export function funnelChart(el, data) {
    console.log(el)
    var myChart = echarts.init(el);




    let option = {

        color: [ "#00BFFF", "#1E90FF", "#0000FF","#87CEFA","#87CEEB"],
        series: [{
            name: '漏斗图',
            type: 'funnel',
            left: 0,
            top: 20,
            bottom: 20,

            width: '100%',
            min: 0, //
            max: 100,
            minSize: '10%',
            maxSize: '80%',
            sort: 'descending',
            gap: 0,
            label: {
                show: true,
                position: 'inside'
            },
            labelLine: {
                length: 10,
                lineStyle: {
                    width: 1,
                    type: 'solid'
                }
            },
            itemStyle: {
                borderColor: '#fff',
                borderWidth: 0
            },
            emphasis: {
                label: {
                    fontSize: 20
                }
            },
            data: data
        }]
    };


    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    myChart.on('click', function (params) {
       ldcId = params.data.id
    });

    
}

export {ldcId}




