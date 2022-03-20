import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Typography, Row, Col } from 'antd';
import { useGetCryptoCoinsQuery } from '../../services/crypto-api';

import StatusCard from '../../components/StatusCard';
import Loader from '../../components/Loader';

import millify from 'millify';
import Cryptocurrencies from '../Cryptocurrencies';
import News from '../News';

import './index.css';

const { Title } = Typography;
const Homepage: React.FC = () => {
    const { data, isFetching } = useGetCryptoCoinsQuery(10);
    if (isFetching) return <Loader />;

    const globalStats = data?.data?.stats;
    const totalCryptocurrencies = globalStats?.total ? globalStats?.total : 0;
    const totalExchanges = globalStats?.totalExchanges ? globalStats?.totalExchanges : 0;
    const totalMarkets = globalStats?.totalMarkets ? globalStats?.totalMarkets : 0;
    const totalMarketCap = globalStats?.totalMarketCap ? Number(globalStats?.totalMarketCap) : 0;
    const total24hVolume = globalStats?.total24hVolume ? Number(globalStats?.total24hVolume) : 0;

    return (
        <Fragment>
            <Title level={2} className='heading'>Crypto Stats</Title>
            <Row gutter={[24, 24]}>
                <Col xs={24} sm={12} lg={6} key={0}>
                    <StatusCard
                        title='Total Cryptocurrencies'
                        count={millify(totalCryptocurrencies)}
                        icon={'bx bx-dollar-circle'}
                    />
                </Col>
                <Col xs={18} sm={8} lg={4} key={1}>
                    <StatusCard
                        title='Total Exchanges'
                        count={millify(totalExchanges)}
                        icon={'bx bx-dollar-circle'}
                    />
                </Col>
                <Col xs={18} sm={8} lg={4} key={2}>
                    <StatusCard
                        title='Total Market Cap'
                        count={millify(totalMarketCap)}
                        icon={'bx bx-dollar'}
                    />
                </Col>
                <Col xs={18} sm={8} lg={4} key={3}>
                    <StatusCard
                        title='Total 24h Volume'
                        count={millify(total24hVolume)}
                        icon={'bx bx-dollar'}
                    />
                </Col>
                <Col xs={18} sm={8} lg={4} key={4}>
                    <StatusCard
                        title='Total Markets'
                        count={millify(totalMarkets)}
                        icon={'bx bx-dollar'}
                    />
                </Col>
            </Row>
            <div className='home-heading-container'>
                <Title level={2} className='home-title'>Top 10 Cryptocurrencies in the world</Title>
                <Title level={3} className='show-more'><Link to='cryptocurrencies'>Show More</Link></Title>
            </div>
            <Cryptocurrencies simplified={true} />
            <div className='home-heading-container'>
                <Title level={2} className='home-title'>Latest Crypto News</Title>
                <Title level={3} className='show-more'><Link to='news'>Show More</Link></Title>
            </div>
            <News simplified={true} />
        </Fragment>
    )
}

export default Homepage;
