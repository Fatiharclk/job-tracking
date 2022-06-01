import React from 'react'
import Columns from './Columns'
import { Table } from 'antd'
export default function JobTable({ data, TagColor, map, getColumnSearchProps, showModal, dispatch, DeleteItem, Swal }) {
    return (
        <>
            <Table pagination={{ pageSize: 6 }} style={{ height: "100%" }} columns={Columns(TagColor, map, getColumnSearchProps,
                showModal, dispatch, DeleteItem, Swal)} dataSource={data}  scroll={{
                    x: 1300,
                  }} />
        </>
    )
}
