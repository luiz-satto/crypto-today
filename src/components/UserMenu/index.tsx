import React from 'react'
import { Link } from 'react-router-dom'

import IUserMenu from '../../interfaces/IUserMenu'

import './index.css'

const UserMenu: React.FC<IUserMenu> = props => {
    return (
        <Link key={props.index} to='/'>
            <div className="user-menu-item">
                <i className={props.item.icon}></i>
                <span>{props.item.content}</span>
            </div>
        </Link>
    )
}

export default UserMenu
