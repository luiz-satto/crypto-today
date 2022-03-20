import React, { useState } from 'react'
import { Select, Typography, Row, Col, Avatar, Card } from 'antd';

import { useGetNewsQuery } from '../../services/crypto-news-api';
import { useGetCryptoCoinsQuery } from '../../services/crypto-api';

import Loader from '../../components/Loader';
import moment from 'moment';
import './index.css';

const { Text, Title } = Typography;
const { Option } = Select;

interface IProps {
    simplified?: boolean
}

const News: React.FC<IProps> = props => {
    const [newsCategory, setNewsCategory] = useState('Cryptocurrency');
    const { data: cryptoNews } = useGetNewsQuery({ newsCategory, count: props.simplified ? 6 : 12 });
    const { data } = useGetCryptoCoinsQuery(100);

    if (!cryptoNews?.value) return <Loader />;

    const demoImage = '';

    return (
        <Row gutter={[24, 24]}>
            {!props.simplified && (
                <Col span={24}>
                    <Select
                        showSearch
                        className='select-news'
                        placeholder='Select a Crypto'
                        optionFilterProp='children'
                        onChange={(value) => setNewsCategory(value)}
                        filterOption={(input, option) => {
                            if (option?.children) {
                                let children = option?.children.toString().toLowerCase();
                                return children.indexOf(input.toLowerCase()) >= 0;
                            }

                            return false;
                        }}
                    >
                        <Option value='Cryptocurrency'>All</Option>
                        {data?.data?.coins.map((coin) => <Option value={coin.name}>{coin.name}</Option>)}
                    </Select>
                </Col>
            )}

            {cryptoNews.value.map((news, i) => (
                <Col xs={24} sm={12} lg={8} key={i}>
                    <Card className='news-card' hoverable>
                        <a href={news.url} target='_blank' rel="noreferrer">
                            <div className='news-image-container'>
                                <Title className='news-title' level={4}>{news.name}</Title>
                                <img style={{ maxWidth: '200px', maxHeight: '100px' }} src={news?.image?.thumbnail?.contentUrl || demoImage} alt='news'></img>
                            </div>
                            <p>
                                {news.description.length > 100
                                    ? `${news.description.substring(0, 100)}`
                                    : news.description
                                }
                            </p>
                            <div className='provider-container'>
                                <div>
                                    <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt='news' />
                                    <Text className='provider-name'>{news.provider[0]?.name}</Text>
                                </div>
                                <Text>{moment(news.datePublished).startOf('s').fromNow()}</Text>
                            </div>
                        </a>
                    </Card>
                </Col>
            ))}
        </Row>
    )
}

export default News;