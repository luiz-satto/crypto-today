import React from 'react'
import { Typography } from 'antd';
import { CryptoNews } from "../../types/CryptoNews";
import IContentData from '../../interfaces/IContentData';
import INotification from '../../interfaces/INotificationItem';

import './index.css'

const { Title } = Typography;
const NotificationItem: React.FC<INotification> = props => {
    const demoImage = '';
    let isCryptoNews = (props.item as IContentData).icon === undefined;
    return (
        isCryptoNews ?
            <div className="notification-item" key={props.index}>
                <a href={(props.item as CryptoNews).url} target='_blank' rel="noreferrer">
                    <div className='news-image-container'>
                        <Title className='news-title' level={4}>{(props.item as CryptoNews).name}</Title>
                        <img style={{ maxWidth: '200px', maxHeight: '100px' }} src={(props.item as CryptoNews)?.image?.thumbnail?.contentUrl || demoImage} alt='news'></img>
                    </div>
                </a>
            </div>
            :
            <div className="notification-item" key={props.index}>
                <i className={(props.item as IContentData).icon}></i>
                <span>{(props.item as IContentData).content}</span>
            </div>
    )
}

export default NotificationItem
