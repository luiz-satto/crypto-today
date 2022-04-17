import React from 'react';
import { useSelector } from 'react-redux';
import { Col, Row, Typography } from 'antd';
import { ApexOptions } from 'apexcharts';

import Chart from 'react-apexcharts';
import ICryptoCoinHistory from '../../interfaces/ICryptoCoinHistory';

import millify from 'millify';
import './index.css';

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
            name: 'Price in USD',
            data: coinPrice
        }
    ]

    const chartOptions: ApexOptions = {
        colors: ['var(--main-color)', 'var(--second-color)'],
        chart: {
            background: 'transparent',
            toolbar: { show: false }
        },
        dataLabels: {
            enabled: false,
            textAnchor: 'start',
        },
        stroke: {
            curve: 'straight'
        },
        yaxis: {
            labels: {
                formatter: (value) => {
                    if (value < 1) {
                        return millify(value, { precision: 6, });
                    }

                    return millify(value);
                }
            }
        },
        xaxis: {
            categories: coinTimestamp,
            sorted: true,
            labels: { show: false },
            axisTicks: { show: false },
        },
        legend: {
            position: 'top'
        },
        grid: {
            show: true
        }
    }

    return (
        <div className="ant-col line-chart-card">
            <Row className='chart-header'>
                <Title level={2} className='chart-title'>{props.coinName} Price</Title>
                <Col className='price-container' key={props.coinName}>
                    <Title level={5} className='price-change'>{coinHistoryData?.change}%</Title>
                    <Title level={5} className='current-price'>Current {props.coinName} Price: $ {props.currentPrice}</Title>
                </Col>
            </Row>

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
        </div>
    )
}

export default LineChart
