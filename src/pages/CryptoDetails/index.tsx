import React, { Fragment, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Col, Row, Typography, Select } from 'antd';

import HTMLReactParser from 'html-react-parser';
import LineChart from '../../components/LineChart';
import Loader from '../../components/Loader';
import millify from 'millify';
import './index.css';

import {
    MoneyCollectOutlined,
    DollarCircleOutlined,
    FundOutlined,
    ExclamationCircleOutlined,
    StopOutlined,
    TrophyOutlined,
    CheckOutlined,
    NumberOutlined,
    ThunderboltOutlined
} from '@ant-design/icons';

import { useGetCryptoDetailsQuery } from '../../services/crypto-api';
import { useGetCryptoHistoryQuery } from '../../services/crypto-api';
import { CryptoCoin } from '../../types/CryptoCoin';

const { Title, Text } = Typography;
const { Option } = Select;

function getCryptoCoinStats(cryptoDetails: CryptoCoin) {
    const priceToUSD = cryptoDetails.price ?
        Number(cryptoDetails.price) < 1 ?
            millify(Number(cryptoDetails.price), { precision: 6 })
            : millify(Number(cryptoDetails.price))
        : 0;

    const rank = cryptoDetails.rank ? cryptoDetails?.rank : 0;
    const volume = cryptoDetails['24hVolume'] ? millify(Number(cryptoDetails['24hVolume'])) : 0;
    const marketCap = cryptoDetails?.marketCap ? millify(Number(cryptoDetails?.marketCap)) : 0;
    const allTimeHighPrice = cryptoDetails.allTimeHigh?.price ? millify(Number(cryptoDetails.allTimeHigh?.price)) : 0;

    return [
        { title: 'Price to USD', value: `$ ${priceToUSD}`, icon: <DollarCircleOutlined /> },
        { title: 'Rank', value: rank, icon: <NumberOutlined /> },
        { title: '24h Volume', value: `$ ${volume}`, icon: <ThunderboltOutlined /> },
        { title: 'Market Cap', value: `$ ${marketCap}`, icon: <DollarCircleOutlined /> },
        { title: 'All-time-high(daily avg.)', value: `$ ${allTimeHighPrice}`, icon: <TrophyOutlined /> },
    ];
}

function getCryptoCoinGenericStats(cryptoDetails: CryptoCoin) {
    const numberOfMarkets = cryptoDetails.numberOfMarkets ? cryptoDetails.numberOfMarkets : 0;
    const numberOfExchanges = cryptoDetails.numberOfExchanges ? cryptoDetails?.numberOfExchanges : 0;
    const confirmed = cryptoDetails.supply?.confirmed;
    const totalSupply = cryptoDetails.supply?.total ? millify(Number(cryptoDetails.supply?.total)) : 0;
    const circulating = cryptoDetails.supply?.circulating ? millify(Number(cryptoDetails.supply?.circulating)) : 0;

    return [
        { title: 'Number Of Markets', value: numberOfMarkets, icon: <FundOutlined /> },
        { title: 'Number Of Exchanges', value: numberOfExchanges, icon: <MoneyCollectOutlined /> },
        { title: 'Aprroved Supply', value: confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
        { title: 'Total Supply', value: `$ ${totalSupply}`, icon: <ExclamationCircleOutlined /> },
        { title: 'Circulating Supply', value: `$ ${circulating}`, icon: <ExclamationCircleOutlined /> },
    ];
}

const CryptoDetails: React.FC = () => {
    const time = ['24h', '7d', '30d'];
    const [timePeriod, setTimePeriod] = useState('7d');

    const { coinId } = useParams();
    const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
    const { data: coinHistory } = useGetCryptoHistoryQuery({ coinId, timePeriod });

    if (isFetching) return <Loader />;

    const cryptoDetails = data?.data?.coin;
    const stats = getCryptoCoinStats(cryptoDetails!);
    const genericStats = getCryptoCoinGenericStats(cryptoDetails!);

    return (
        <Fragment>
            <hr />
            <Col className='coin-heading-container'>
                <Title level={2} className='coin-name'>
                    {cryptoDetails?.name} ({cryptoDetails?.symbol})
                </Title>
                <p>
                    {cryptoDetails?.name} price in US dollars.
                    View value statistics, market cap and supply.
                </p>
            </Col>
            <hr />
            <Select
                defaultValue='7d'
                className='select-timeperiod'
                placeholder='Select Time Period'
                onChange={(value) => setTimePeriod(value)}
            >
                {time.map((date) => <Option key={date}>{date}</Option>)}
            </Select>
            <Col className='stats-container'>
                <LineChart
                    coinHistory={coinHistory}
                    currentPrice={
                        Number(cryptoDetails?.price) < 1 ?
                            millify(Number(cryptoDetails?.price), { precision: 6 })
                            : millify(Number(cryptoDetails?.price))
                    }
                    coinName={cryptoDetails?.name!}
                />
                <Col className='coin-value-statistics'>
                    <Col className='coin-value-statistics-heading'>
                        <Title level={3} className='coin-details-heading'>
                            {cryptoDetails?.name} Value Statistics
                        </Title>
                        <p>
                            An overview showing the stats of {cryptoDetails?.name}
                        </p>
                    </Col>
                    {stats.map(({ icon, title, value }, i) => (
                        <Col className='coin-stats' key={i}>
                            <Col className='coin-stats-name'>
                                <Text>{icon}</Text>
                                <Text>{title}</Text>
                            </Col>
                            <Text className='stats'>{value}</Text>
                        </Col>
                    ))}
                </Col>
                <Col className='other-stats-info'>
                    <Col className='coin-value-statistics-heading'>
                        <Title level={3} className='coin-details-heading'>
                            Other Statistics
                        </Title>
                        <p>
                            An overview showing the stats of all cryptocurrencies
                        </p>
                    </Col>
                    {genericStats.map(({ icon, title, value }, i) => (
                        <Col className='coin-stats' key={i}>
                            <Col className='coin-stats-name'>
                                <Text>{icon}</Text>
                                <Text>{title}</Text>
                            </Col>
                            <Text className='stats'>{value}</Text>
                        </Col>
                    ))}
                </Col>
            </Col>
            <hr />
            <Col className='coin-desc-link'>
                <Row className='coin-desc'>
                    <Title level={3} className='coin-details-heading'>
                        What is {cryptoDetails?.name}?
                        {HTMLReactParser(cryptoDetails?.description!)}
                    </Title>
                </Row>
                <Col className='coin-links'>
                    <Title level={3} className='coin-details-heading'>
                        {cryptoDetails?.name} Links
                    </Title>
                    {cryptoDetails?.links.map((link) => (
                        <Row className='coin-link' key={link.name}>
                            <Title level={5} className='link-name'>
                                {link.type}
                            </Title>
                            <a href={link.url} target='_blank' rel="noreferrer">
                                {link.name}
                            </a>
                        </Row>
                    ))}
                </Col>
            </Col>
        </Fragment>
    )
}

export default CryptoDetails;