import React from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'

import SidebarItem from '../SidebarItem'

import logo from '../../assets/images/logo.png'
import sidebar_items from '../../assets/json-data/sidebar_routes.json'

import './index.css'
import Typography from '@material-ui/core/Typography'

const Sidebar: React.FC<RouteComponentProps> = props => {

  const activeItem = sidebar_items.findIndex(item => item.route === props.location.pathname)

  return (
    <div className='sidebar'>
      <div className="sidebar__logo">
        <img src={logo} alt="company logo" />
        <Typography variant="h4" className='sidebar__logo__title'>
          <Link to='/'>{process.env.REACT_APP_TITLE}</Link>
        </Typography>
        {/* <Button className='menu-control-container' onClick={() => setActiveMenu(!activeMenu)}>
          <MenuOutlined />
        </Button> */}
      </div>
      {
        sidebar_items.map((item, index) => (
          <Link to={item.route} key={index}>
            <SidebarItem
              title={item.display_name}
              icon={item.icon}
              active={index === activeItem}
            />
          </Link>
        ))
      }
    </div>
  )
}

export default Sidebar