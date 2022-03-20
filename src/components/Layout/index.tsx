import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Sidebar from '../Sidebar'
import Topnav from '../Topnav'
import Router from '../../routes'

import './index.css'
import ThemeAction from '../../redux/actions/ThemeAction'

const Layout: React.FC = () => {
  const themeReducer = useSelector((state: any) => state.ThemeReducer)
  const dispatch = useDispatch()

  useEffect(() => {
    const themeClass = localStorage.getItem('themeMode')
    const colorClass = localStorage.getItem('colorMode')

    dispatch(ThemeAction.setMode(themeClass))
    dispatch(ThemeAction.setColor(colorClass))
  }, [dispatch])

  return (
    <div className={`layout ${themeReducer.mode} ${themeReducer.color}`}>
      <Sidebar />
      <div className="layout__content">
        <Topnav />
        <div className="layout__content-main">
          <Router />
        </div>
      </div>
    </div>
  );
}

export default Layout