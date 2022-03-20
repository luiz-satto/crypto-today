import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Typography, Row, Col, Statistic } from 'antd';
import { useGetCryptoCoinsQuery } from '../../services/crypto-api';

import StatusCard from '../../components/StatusCard';
import Loader from '../../components/Loader';

import Cryptocurrencies from '../Cryptocurrencies';
import millify from 'millify';

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
                <div className='col-3'>
                    <StatusCard
                        title='Total Cryptocurrencies'
                        count={millify(totalCryptocurrencies)}
                        icon={'bx bx-dollar-circle'}
                    />
                </div>

                <div className='col-3'>
                    <StatusCard
                        title='Total Exchanges'
                        count={millify(totalExchanges)}
                        icon={'bx bx-dollar-circle'}
                    />
                </div>

                <div className='col-2'>
                    <StatusCard
                        title='Total Market Cap'
                        count={millify(totalMarketCap)}
                        icon={'bx bx-dollar-circle'}
                    />
                </div>

                <div className='col-2'>
                    <StatusCard
                        title='Total 24h Volume'
                        count={millify(total24hVolume)}
                        icon={'bx bx-dollar-circle'}
                    />
                </div>

                <div className='col-2'>
                    <StatusCard
                        title='Total Markets'
                        count={millify(totalMarkets)}
                        icon={'bx bx-dollar-circle'}
                    />
                </div>
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
            {/* <News simplified={true} /> */}
        </Fragment>
    )
}

export default Homepage;
