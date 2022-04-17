import React from 'react';
import { Link } from 'react-router-dom';
import { CryptoNews } from '../../types/CryptoNews';
import { useGetNewsQuery } from '../../services/crypto-news-api';

import Dropdown from '../Dropdown';
import ThemeMenu from '../ThemeMenu';
import NotificationItem from '../NotificationItem';
import Loader from '../../components/Loader';
import IContentData from '../../interfaces/IContentData';

import './index.css';

const Topnav: React.FC = () => {
    const { data: cryptoNews } = useGetNewsQuery({ newsCategory: 'Cryptocurrency', count: 5 });
    if (!cryptoNews?.value) return <Loader />;

    return (
        <div className='topnav'>
            <div className="topnav__right">
                <div className="topnav__right-item">
                    <Dropdown
                        icon='bx bx-category-alt'
                        badge='!'
                        contentData={cryptoNews?.value}
                        renderFooter={() => <Link to='/news'>View All</Link>}
                        renderItems={(item: IContentData | CryptoNews, index: number) =>
                            <NotificationItem item={item} index={index} />
                        }
                    />
                </div>
                <div className="topnav__right-item">
                    <ThemeMenu />
                </div>
            </div>
        </div>
    )
}

export default Topnav