import React from 'react'
import {Table} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

const Order = props => {
  const date = new Date(props.order.updatedAt)
  return (
    <Table.Row className="orderRow" textAlign="center">
      <Table.Cell>
        <Link to={`/orders/${props.order.id}`}>{props.order.id}</Link>
      </Table.Cell>
      <Table.Cell>{`${date.getMonth() +
        1} - ${date.getDate()} - ${date.getFullYear()}`}</Table.Cell>
      <Table.Cell>${props.order.total / 100}</Table.Cell>
    </Table.Row>
  )
}

export default Order
