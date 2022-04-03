import React from 'react';
import { Link } from 'react-router-dom';

import Dropdown from '../Dropdown';
import NotificationItem from '../NotificationItem';
import UserMenu from '../UserMenu';

import userImage from '../../assets/images/user.png';
import notifications from '../../assets/json-data/notification.json';
import user_menu from '../../assets/json-data/user_menus.json';

import IContentData from '../../interfaces/IContentData';
import ThemeMenu from '../ThemeMenu';

import './index.css';

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
    return (
        <div className='topnav'>
            <div className="topnav__right">
                <div className="topnav__right-item">
                    <Dropdown
                        customToggle={() => renderUserToggle(user.displayName, user.image)}
                        contentData={user_menu}
                        renderItems={(item: IContentData, index: number) =>
                            <UserMenu item={item} index={index} />
                        }
                    />
                </div>
                <div className="topnav__right-item">
                    <Dropdown
                        icon='bx bx-bell'
                        badge='12'
                        contentData={notifications}
                        renderFooter={() => <Link to='/'>View All</Link>}
                        renderItems={(item: IContentData, index: number) =>
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