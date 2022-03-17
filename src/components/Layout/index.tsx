import React, { useEffect } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import Sidebar from '../Sidebar'
import Topnav from '../Topnav'
import Routes from '../../routes'

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
    <BrowserRouter>
      <Route render={(props) => (
        <div className={`layout ${themeReducer.mode} ${themeReducer.color}`}>
          <Sidebar {...props} />
          <div className="layout__content">
            <Topnav />
            <div className="layout__content-main">
              <Routes />
            </div>
          </div>
        </div>
      )} />
    </BrowserRouter>
  )
}

export default Layout