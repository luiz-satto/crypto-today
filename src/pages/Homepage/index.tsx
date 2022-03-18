import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Typography, Row, Col, Statistic } from 'antd';

import millify from 'millify';
import Loader from '../../components/Loader';

// import { Cryptocurrencies, News } from '../../components';
import { useGetCryptoCoinsQuery } from '../../services/crypto-api';

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
    const total24hPercent = (total24hVolume / totalMarketCap) * 100;

    return (
        <Fragment>
            <Title level={2} className='heading'>Global Crypto Stats</Title>
            <Row gutter={[24, 24]}>
                <Col xs={24} sm={12} lg={8}>
                    <Statistic title='Total Cryptocurrencies' value={totalCryptocurrencies} />
                    <Statistic title='Total Exchanges' value={millify(totalExchanges)} />
                    <Statistic title='Total Market Cap' value={millify(totalMarketCap)} />
                </Col>
                <Col xs={24} sm={12} lg={8}>
                    <Statistic title='Total 24h Volume' value={millify(total24hVolume)} />
                    <Statistic title='Total 24h %' value={millify(total24hPercent) + '%'} />
                    <Statistic title='Total Markets' value={millify(totalMarkets)} />
                </Col>
            </Row>
            <div className='home-heading-container'>
                <Title level={2} className='home-title'>Top 10 Cryptocurrencies in the world</Title>
                <Title level={3} className='show-more'><Link to='cryptocurrencies'>Show More</Link></Title>
            </div>
            {/* <Cryptocurrencies simplified={true} /> */}
            <div className='home-heading-container'>
                <Title level={2} className='home-title'>Latest Crypto News</Title>
                <Title level={3} className='show-more'><Link to='news'>Show More</Link></Title>
            </div>
            {/* <News simplified={true} /> */}
        </Fragment>
    )
}

export default Homepage;
