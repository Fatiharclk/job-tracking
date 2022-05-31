import React from 'react';
import { AiFillEdit, AiFillDelete } from "react-icons/ai"
import { Table, Tag, Space } from 'antd';

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <div>{text}</div>,
    },


    {
        title: 'Priority',
        key: 'priority',
        dataIndex: 'priority',
        render: (tag) => (
            TagColor(tag)
        ),
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <AiFillEdit size={21}></AiFillEdit>
                <AiFillDelete size={21}></AiFillDelete>
            </Space>
        ),
    },
];

const data = [
    {
        key: '1',
        name: 'Adaylarla İlgili Teknik ödev hazırlanması gerekiyor',
        priority: "Urgent",
    },
    {
        key: '2',
        name: 'Yapılan İşlerle İlgili Activity Kayıtlaı oluşturmam gerekiyor',
        priority: "Regular",
    },
    {
        key: '3',
        name: 'teknik taslakları planlayacağım',
        priority: "Trivial",
    },

];

const TagColor = (priority) => {

    switch (priority) {
        case "Urgent":
            return (<Tag color={"red"}>{priority}</Tag>)
        case "Regular":
            return (<Tag color={"orange"}>{priority}</Tag>)
        case "Trivial":
            return (<Tag color={"blue"}>{priority}</Tag>
            )
        default:
            break;
    }

}
export default function TableScreen() {
    return (
        <div className=''>
            <Table columns={columns} dataSource={data} />
        </div>
    )
}
