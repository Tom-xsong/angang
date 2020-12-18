let echarts = require('echarts');


//漏斗图
export function funnelChart(el) {

    console.log(el)
    var myChart = echarts.init(el);




    let option = {

        color: ["#87CEFA", "#87CEEB", "#00BFFF", "#1E90FF", "#0000FF"],
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
            maxSize: '50%',
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
            data: [{
                value: 10,
                name: '20.4T'
            },
            {
                value: 20,
                name: '34.5T'
            },
            {
                value: 40,
                name: '45.3T'
            },
            {
                value: 70,
                name: '65.2T'
            },
            {
                value: 100,
                name: '81.4T'
            }
            ]
        }]
    };


    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);


}