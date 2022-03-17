import React from 'react'
import { Link } from 'react-router-dom'

import IUserMenu from './IUserMenu'

import './index.css'

const UserMenu: React.FC<IUserMenu> = props => {
    return (
        <Link to='/' key={props.index}>
            <div className="user-menu-item">
                <i className={props.item.icon}></i>
                <span>{props.item.content}</span>
            </div>
        </Link>
    )
}

export default UserMenu
