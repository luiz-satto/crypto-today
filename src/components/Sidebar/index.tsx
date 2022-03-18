import React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Typography } from 'antd';

import SidebarItem from '../SidebarItem';
import sidebar_items from '../../assets/json-data/sidebar_routes.json';
import icon from '../../assets/images/logo.png';
import './index.css';

const { Title } = Typography;
const Sidebar: React.FC<RouteComponentProps> = props => {
  const activeItem = sidebar_items.findIndex(item => item.route === props.location.pathname);

  return (
    <div className='sidebar'>
      <div className="sidebar__logo">
        <img src={icon} alt="company logo" />
        <Title level={2} className='sidebar__logo__title'>
          <Link to='/'>{process.env.REACT_APP_TITLE}</Link>
        </Title>
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