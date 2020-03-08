import React from 'react'
import Chart from "chart.js"
import General from '../../General/General'
import './home.css'
let donutLabel1 = ["Tủ trống", "Tủ đang sử dụng", "Tủ bị vô hiệu hoá"];
let donutLabel2 = ["Tủ hoạt động bình thường", "Tủ có lỗi kỹ thuật", "Không rõ"]
let chartLabel3 = ["Xâm phạm trái phép", "Thiết bị mất kết nối"]
window.chartColors = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(231,233,237)'
};
var donut = null;
var donut2 = null;
var chart3 = null;
var g = {
    Items1: [2265, 50, 0],
    Items2: [1934, 381, 0],
    Items3: [503, 132],
    Count: 2315
};


class Home extends React.Component {
    constructor() {
        super()
    }

    LoadStaticData() {
        let g = {
            Items1: [2265, 50, 0],
            Items2: [1934, 381, 0],
            Items3: [503, 132],
            Count: 2315
        };
        donut.data.datasets[0].data = g.Items1;
        donut.update();
        donut2.data.datasets[0].data = g.Items2;
        donut2.update();
        chart3.data.datasets[0].data[0] = g.Items3[0];
        chart3.data.datasets[1].data[0] = g.Items3[1];
        chart3.update();
    }
    componentDidMount() {
        Chart.helpers.merge(Chart.defaults.global.plugins.datalabels, {
            color: '#FE777B'
        });
        let color = Chart.helpers.color;
        let _donut1 = this.refs.LockerStatistical
        let _donut2 = this.refs.LockerHealth
        let _chart3 = this.refs.WarningStatistical
        if (g.Items1.length === 3) {
            donut = new Chart(_donut1, {
                type: 'doughnut',
                data: {
                    datasets: [
                        {
                            backgroundColor: ['#2980b9', "#e30613", "#aaa"],
                            data: g.Items1,
                            datalabels: {
                                anchor: 'end'
                            }
                        }],
                    labels: donutLabel1
                },
                options: {
                    animation: {
                        animateSacale: true
                    },
                    responsive: false,
                    legend: {
                        position: 'bottom',
                        display: true,
                        labels: {
                            padding: 20
                        }
                    },
                    layout: {
                        padding: {
                            left: 0,
                            right: 0,
                            top: 20,
                            bottom: 20
                        }
                    },
                    plugins: {
                        datalabels: {
                            backgroundColor: function (context) {
                                return context.dataset.backgroundColor;
                            },
                            borderColor: 'white',
                            borderRadius: 25,
                            borderWidth: 2,
                            color: 'white',
                            display: function (context) {
                                var dataset = context.dataset;
                                var count = dataset.data.length;
                                var value = dataset.data[context.dataIndex];
                                return value > count * 1.5;
                            },
                            font: {
                                weight: 'bold'
                            },
                            formatter: Math.round
                        }
                    }
                }
            });
        }

        if (g.Items2.length === 3) {
            donut2 = new Chart(_donut2, {
                type: 'doughnut',
                data: {
                    datasets: [{
                        backgroundColor: ['#16a085', '#e67e22', '#bababa'],
                        data: g.Items2,
                        datalabels: {
                            anchor: 'end'
                        }
                    }],
                    labels: donutLabel2
                },
                options: {
                    animation: {
                        animateSacale: true,
                    },
                    responsive: false,
                    legend: {
                        position: 'bottom',
                        display: true,
                        labels: {
                            padding: 20
                        }
                    },
                    layout: {
                        padding: {
                            left: 0,
                            right: 0,
                            top: 20,
                            bottom: 20
                        }
                    },
                    plugins: {
                        datalabels: {
                            backgroundColor: function (context) {
                                return context.dataset.backgroundColor;
                            },
                            borderColor: 'white',
                            borderRadius: 25,
                            borderWidth: 2,
                            color: 'white',
                            display: function (context) {
                                var dataset = context.dataset;
                                var count = dataset.data.length;
                                var value = dataset.data[context.dataIndex];
                                return value > count * 1.5;
                            },
                            font: {
                                weight: 'bold'
                            },
                            formatter: Math.round
                        }
                    }
                }
            });
        }

        if (g.Items3.length === 2) {
            chart3 = new Chart(_chart3, {
                type: 'bar',
                data: {
                    datasets: [
                        {
                            backgroundColor: color(window.chartColors.red).rgbString(),
                            borderColor: window.chartColors.red,
                            borderWidth: 1,
                            label: "Xâm phạm trái phép",
                            data: [g.Items3[0]],
                            maxBarThickness: 40,
                            datalabels: {
                                anchor: 'end'
                            }
                        },
                        {
                            backgroundColor: color(window.chartColors.blue).rgbString(),
                            borderColor: window.chartColors.blue,
                            borderWidth: 1,
                            maxBarThickness: 40,
                            label: "Thiết bị mất kết nối",
                            data: [g.Items3[1]],
                            datalabels: {
                                anchor: 'end'
                            }
                        }
                    ]

                },
                options: {
                    animation: {
                        animateSacale: true
                    },
                    responsive: false,
                    legend: {
                        position: 'bottom',
                        display: true,
                        labels: {
                            padding: 20
                        },
                    },
                    layout: {
                        padding: {
                            left: 0,
                            right: 0,
                            top: 20,
                            bottom: 20
                        }
                    },
                    plugins: {
                        datalabels: {
                            backgroundColor: function (context) {
                                return context.dataset.backgroundColor;
                            },
                            borderColor: 'white',
                            borderRadius: 25,
                            borderWidth: 2,
                            color: 'white',
                            display: true,
                            font: {
                                weight: 'bold'
                            },
                            formatter: Math.round
                        }
                    }
                }
            });
        }

        setInterval(this.LoadStaticData, 15000);
        // const LockerStatistical = this.refs.LockerStatistical
        // const LockerHealth = this.refs.LockerHealth
        // const WarningStatistical = this.refs.WarningStatistical
        // const configs = {
        //     type: "line",
        //     data: {
        //         labels: ["Jan", "Feb", "March"],
        //         datasets: [
        //             {
        //                 label: "Sales",
        //                 data: [86, 67, 91],
        //             }
        //         ]
        //     },
        // }
        // new Chart(LockerStatistical, configs)
        // new Chart(LockerHealth, configs)
        // new Chart(WarningStatistical, configs);

    }
    render() {
        var styleHeight = {
            // height: '300px',
        }

        return (
            <General>
                <div style={styleHeight} id="LockerStatistical" className="col-6">
                    <p className="chart-Details" style={{display: 'block', textAlign:'center'}}>Thống kê tình trạng sử dụng tủ</p>
                    <canvas ref='LockerStatistical' width="550" height="350" />
                </div>
                <div style={styleHeight} id="LockerHealth" className="col-6">
                    <p className="chart-Details" style={{display: 'block', textAlign:'center'}}>Thống kê tình trạng sử dụng tủ</p>
                    <canvas ref='LockerHealth' width="550" height="350" />
                </div>
                <div className="col-3"></div>
                <div style={styleHeight} id="WarningStatistical" className="col-6">
                    <p className="chart-Details" style={{display: 'block', textAlign:'center'}}>Thống kê tình trạng sử dụng tủ</p>
                    <canvas ref='WarningStatistical' width="550" height="350" />
                </div>
                <div className="col-3"></div>
            </General>
        )
    }
}
export default Home
