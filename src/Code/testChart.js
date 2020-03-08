import React, { Component } from 'react'
import Chart from "chart.js";

export default class LineGraph extends Component {
    
    componentDidMount() {
        const chart = this.refs.chart
        new Chart(chart, {
            type: "line",
            data: {
                labels: ["Jan", "Feb", "March"],
                datasets: [
                    {
                        label: "Sales",
                        data: [86, 67, 91],
                    }
                ]
            },
        });
    }
    render() {
        return (
            <div>
                <canvas id="myChart" ref='chart'/>
            </div>
        )
    }
}