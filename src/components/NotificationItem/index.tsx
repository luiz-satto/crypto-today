import React from 'react'

import INotification from './INotificationItem'

import './index.css'

const NotificationItem: React.FC<INotification> = props => {
    return (
        <div className="notification-item" key={props.index}>
            <i className={props.item.icon}></i>
            <span>{props.item.content}</span>
        </div>
    )
}

export default NotificationItem
