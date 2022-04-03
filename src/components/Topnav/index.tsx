import React from 'react';
import { Link } from 'react-router-dom';
import { useGetNewsQuery } from '../../services/crypto-news-api';

import Dropdown from '../Dropdown';
import UserMenu from '../UserMenu';
import ThemeMenu from '../ThemeMenu';
import Loader from '../../components/Loader';
import NotificationItem from '../NotificationItem';
import IContentData from '../../interfaces/IContentData';

import userImage from '../../assets/images/user.png';
import user_menu from '../../assets/json-data/user_menus.json';

import './index.css';
import { CryptoNews } from '../../types/CryptoNews';

const user = {
    displayName: 'Luiz Satto',
    image: userImage
}

const renderUserToggle = (displayName: string, image: string) => (
    <div className="topnav__right-user">
        <div className="topnav__right-user__image">
            <img src={image} alt="" />
        </div>
        <div className="topnav__right-user__name">
            {displayName}
        </div>
    </div>
)

const Topnav: React.FC = () => {
    const { data: cryptoNews } = useGetNewsQuery({ newsCategory: 'Cryptocurrency', count: 5 });
    if (!cryptoNews?.value) return <Loader />;

    return (
        <div className='topnav'>
            <div className="topnav__right-item">
                <Dropdown
                    customToggle={() => renderUserToggle(user.displayName, user.image)}
                    contentData={user_menu}
                    renderItems={(item: any, index: number) =>
                        <UserMenu item={item} index={index} />
                    }
                />
            </div>
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