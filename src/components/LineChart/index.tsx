import React, { Fragment } from 'react';
// import { Line } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { Col, Row, Typography } from 'antd';

import { ApexOptions } from 'apexcharts';
import Chart from 'react-apexcharts';
import ICryptoCoinHistory from '../../interfaces/ICryptoCoinHistory';

// import {
//     Chart as ChartJS,
//     CategoryScale,
//     LinearScale,
//     PointElement,
//     LineElement,
//     Tooltip,
//     Legend,
// } from 'chart.js'

// ChartJS.register(
//     CategoryScale,
//     LinearScale,
//     PointElement,
//     LineElement,
//     Tooltip,
//     Legend
// );

const chartOptions: ApexOptions = {
    colors: ['#6ab04c', '#2980b9'],
    chart: {
        background: 'transparent'
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        curve: 'smooth'
    },
    xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
    },
    legend: {
        position: 'top'
    },
    grid: {
        show: false
    }
}

interface IProps {
    coinHistory: ICryptoCoinHistory | undefined,
    currentPrice: string,
    coinName: string
}

const { Title } = Typography;
const LineChart: React.FC<IProps> = props => {
    const themeReducer = useSelector((state: any) => state.ThemeReducer.mode);

    let coinHistoryData = props.coinHistory?.data;
    let coinTimestamp = [];
    let coinPrice = [];

    if (coinHistoryData?.history) {
        for (let i = 0; i < coinHistoryData?.history.length; i++) {
            let timestamp = coinHistoryData?.history[i].timestamp * 1000;
            coinTimestamp.push(new Date(timestamp).toLocaleDateString());
            coinPrice.push(coinHistoryData?.history[i].price);
        }
    }

    const chartSeries = [
        {
            name: 'Price In USD',
            data: coinPrice
        }
    ]

    // const data = {
    //     labels: coinTimestamp,
    //     datasets: [
    //         {
    //             label: 'Price In USD',
    //             data: coinPrice,
    //             fill: false,
    //             backgroundColor: '#0071bd',
    //             borderColor: '#0071bd',
    //         },
    //     ],
    // };

    // const options: any = {
    //     scales: {
    //         yAxes: [
    //             {
    //                 ticks: {
    //                     beginAtZero: true,
    //                 },
    //             },
    //         ],
    //     },
    // };

    return (
        <Fragment>
            <Row className='chart-header'>
                <Title level={2} className='chart-title'>{props.coinName} Price Chart</Title>
                <Col className='price-container' key={props.coinName}>
                    <Title level={5} className='price-change'>{coinHistoryData?.change}%</Title>
                    <Title level={5} className='current-price'>Current {props.coinName} Price: $ {props.currentPrice}</Title>
                </Col>
            </Row>
            {/* <Line data={data} options={options} /> */}
            <Chart
                options={themeReducer === 'theme-mode-dark'
                    ? {
                        ...chartOptions,
                        theme: { mode: 'dark' }
                    } : {
                        ...chartOptions,
                        theme: { mode: 'light' }
                    }
                }
                series={chartSeries}
                type='line'
                height='100%'
            />
        </Fragment>
    )
}

export default LineChart
