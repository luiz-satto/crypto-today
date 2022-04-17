import React, { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Card, Row, Col } from 'antd';

import { useGetCryptoCoinsQuery } from '../../services/crypto-api';
import { CryptoCoin } from '../../types/CryptoCoin';

import SearchBar from '../../components/SearchBar';
import Loader from '../../components/Loader';
import millify from 'millify';
import './index.css';

interface IProps {
    simplified?: boolean
}

const Cryptocurrencies: React.FC<IProps> = props => {
    const count = props.simplified ? 4 : 100;
    const { data: cryptosList, isFetching } = useGetCryptoCoinsQuery(count);
    const [cryptos, setCryptos] = useState<CryptoCoin[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');

    useEffect(() => {
        let coins = cryptosList?.data?.coins;
        if (coins) {
            const filteredData = coins.filter((coin) => coin.name.toLowerCase().includes(searchTerm.toLocaleLowerCase()));
            if (filteredData) setCryptos(filteredData);
        }
    }, [cryptosList, searchTerm]);

    if (isFetching) return <Loader />;

    return (
        <Fragment>
            {!props.simplified && (
                <SearchBar setSearchTerm={setSearchTerm} />
            )}

            <Row gutter={[12, 12]} className='crypto-card-container'>
                {cryptos?.map((currency) => (
                    <Col xs={24} sm={12} lg={6} key={currency.uuid}>
                        <Link to={(props.simplified ? `cryptocurrencies/` : '') + `${currency.uuid}`}>
                            <Card
                                className='crypto-card'
                                title={`${currency.rank}. ${currency.name}`}
                                extra={<img className='crypto-image' src={currency.iconUrl} alt={currency.iconUrl} />}
                                hoverable
                            >
                                <p>Price: {
                                    (Number(currency.price) < 1) ?
                                        millify(Number(currency.price), { precision: 6 })
                                        : millify(Number(currency.price))
                                }</p>
                                <p>Market Cap: {millify(Number(currency.marketCap))}</p>
                                <p>Daily Change: {millify(Number(currency.change))}%</p>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
        </Fragment>
    )
}

export default Cryptocurrencies;