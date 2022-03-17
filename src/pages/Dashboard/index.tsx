import React from 'react'
import { Link } from 'react-router-dom'

import { ApexOptions } from 'apexcharts'
import Chart from 'react-apexcharts'

import { useSelector } from 'react-redux'

import StatusCard from '../../components/StatusCard'
import Table from '../../components/Table'
import Badge from '../../components/Badge'

import statusCard from '../../assets/json-data/status-card-data.json'

const chartSeries = [
  {
    name: 'Store Customers',
    data: [40, 30, 70, 80, 40, 16, 40, 20, 51]
  },
  {
    name: 'Online Customers',
    data: [40, 70, 20, 90, 36, 80, 30, 91, 60]
  }
]

const chartOptions: ApexOptions = {
  colors: ['#6ab04c', '#2980b9'],
  chart: {
    background: 'transparent'
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'smooth'
  },
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
  },
  legend: {
    position: 'top'
  },
  grid: {
    show: false
  }
}

const topCustomers = {
  head: [
    'user',
    'total orders',
    'total spending'
  ],
  body: [
    {
      "username": "john doe",
      "order": "490",
      "price": "$15,870"
    },
    {
      "username": "frank iva",
      "order": "250",
      "price": "$12,251"
    },
    {
      "username": "anthony baker",
      "order": "120",
      "price": "$10,840"
    },
    {
      "username": "frank iva",
      "order": "110",
      "price": "$9,251"
    },
    {
      "username": "anthony baker",
      "order": "80",
      "price": "$8,840"
    }
  ]
}

const latestOrders = {
  header: [
    "order id",
    "user",
    "total price",
    "date",
    "status"
  ],
  body: [
    {
      id: "#OD1711",
      username: "John Doe",
      date: "17 Jun 2021",
      price: "$900",
      status: "Shipping"
    },
    {
      id: "#OD1712",
      username: "Frank Iva",
      date: "1 Jun 2021",
      price: "$400",
      status: "Paid"
    },
    {
      id: "#OD1713",
      username: "Anthony Baker",
      date: "27 Jun 2021",
      price: "$200",
      status: "Pending"
    },
    {
      id: "#OD1712",
      username: "Frank Iva",
      date: "1 Jun 2021",
      price: "$400",
      status: "Paid"
    },
    {
      id: "#OD1713",
      username: "Anthony Baker",
      date: "27 Jun 2021",
      price: "$200",
      status: "Refund"
    }
  ]
}

enum OrderStatus {
  Shipping = "primary",
  Pending = "warning",
  Paid = "success",
  Refund = "danger"
}

const Dashboard: React.FC = () => {
  const themeReducer = useSelector((state: any) => state.ThemeReducer.mode)
  let orderStatus = (OrderStatus as any)

  return (
    <div>
      <h2 className='page-header'>Dashboard</h2>
      <div className='row'>
        <div className='col-6'>
          <div className='row'>
            {
              statusCard.map((item, index) => (
                <div className='col-6'>
                  <StatusCard
                    icon={item.icon}
                    count={item.count}
                    title={item.title}
                  />
                </div>
              ))
            }
          </div>
        </div>
        <div className='col-6'>
          <div className="card full-height">
            <Chart
              options={themeReducer === 'theme-mode-dark'
                ? {
                  ...chartOptions,
                  theme: { mode: 'dark' }
                } : {
                  ...chartOptions,
                  theme: { mode: 'light' }
                }
              }
              series={chartSeries}
              type='line'
              height='100%'
            />
          </div>
        </div>
        <div className='col-4'>
          <div className='card'>
            <div className='card__header'>
              <h3>Top Customers</h3>
            </div>
            <div className='card__body'>
              <Table
                limit={topCustomers.body.length}
                headData={topCustomers.head}
                renderHead={(item, index) => <th key={index}>{item}</th>}
                bodyData={topCustomers.body}
                renderBody={(item, index) =>
                  <tr key={index}>
                    <td>{item.username}</td>
                    <td>{item.order}</td>
                    <td>{item.price}</td>
                  </tr>
                }
              />
            </div>
            <div className='card__footer'>
              <Link to='/customers'>view all</Link>
            </div>
          </div>
        </div>
        <div className="col-8">
          <div className="card">
            <div className="card__header">
              <h3>Latest Orders</h3>
            </div>
            <div className="card__body">
              <Table
                headData={latestOrders.header}
                renderHead={(item, index) => <th key={index}>{item}</th>}
                bodyData={latestOrders.body}
                renderBody={(item, index) =>
                  <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.username}</td>
                    <td>{item.price}</td>
                    <td>{item.date}</td>
                    <td>
                      <Badge type={item.status
                        ? orderStatus[item.status]
                        : 'primary'
                      } content={item.status} />
                    </td>
                  </tr>
                }
              />
            </div>
            <div className="card__footer">
              <Link to='/orders'>view all</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
