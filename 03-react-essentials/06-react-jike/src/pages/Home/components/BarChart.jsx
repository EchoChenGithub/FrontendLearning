// 柱状图组件

// 把功能代码都放到这个组件中
// 把可变部分抽象成 prop 参数

import {useEffect, useRef} from "react"
import * as echarts from "echarts"

const BarChart = ({title}) => {
    // 创建 Ref 对象，用于存储图表实例
    const chartRef = useRef(null)

    // 确保 DOM 节点存在后，才进行图表的渲染
    useEffect(() => {
        // 通过 Ref 的 current 属性获取 DOM 节点
        const chart = chartRef.current

        if (chart) {
            // 初始化图表实例
            const myChart = echarts.init(chart)

            // 定义图表配置项
            let option
            option = {
                title: {
                    text: title
                },
                xAxis: {
                    type: 'category',
                    data: ['Vue', 'React', 'Angular']
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        data: [10, 40, 70],
                        type: 'bar'
                    }
                ]
            }

            // 使用图表参数完成图标的渲染
            option && myChart.setOption(option)

            // 清理函数：在组件卸载时销毁图表实例，防止内存泄漏
            return () => {
                myChart.dispose(); // 销毁图表实例
            }
        }
    }, [])

    return (
        <div ref={chartRef} style={{width: '500px', height: '400px'}}></div>
    )
}

export default BarChart;