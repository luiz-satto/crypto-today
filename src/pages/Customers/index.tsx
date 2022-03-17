import React from 'react'
import Table from '../../components/Table'

import customerList from '../../assets/json-data/customers-list.json'
import ICustomerData from './ICustomerData'

const customerTableHead = [
  '',
  'name',
  'email',
  'phone',
  'total orders',
  'total spend',
  'location'
]

const Customers: React.FC = () => {
  return (
    <div>
      <h2 className="page-header">
        Customers
      </h2>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__body">
              <Table
                limit={10}
                headData={customerTableHead}
                renderHead={(item, index) => <th key={index}>{item}</th>}
                bodyData={customerList}
                renderBody={
                  (item: ICustomerData, index) => (
                    <tr key={index}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.phone}</td>
                      <td>{item.total_orders}</td>
                      <td>{item.total_spend}</td>
                      <td>{item.location}</td>
                    </tr>
                  )
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Customers
