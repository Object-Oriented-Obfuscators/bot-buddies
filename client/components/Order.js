import React from 'react'
import {Table} from 'semantic-ui-react'

const Order = props => {
  console.log(props.order)
  const date = new Date(props.order.updatedAt)
  return (
    <Table.Row className="orderRow">
      <Table.Cell>{props.order.id}</Table.Cell>
      <Table.Cell>{`${date.getMonth() +
        1} - ${date.getDate()} - ${date.getFullYear()}`}</Table.Cell>
      <Table.Cell>${props.order.total / 100}</Table.Cell>
    </Table.Row>
  )
}

export default Order
