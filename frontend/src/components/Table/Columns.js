import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { Space } from "antd";
const columns = (TagColor, map, getColumnSearchProps, showModal, dispatch, DeleteItem, Swal) => [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        width: '80%',
        
        render: (text) => <p>{text} </p>,
        ...getColumnSearchProps('name'),
        sorter: (a, b) => a.name.localeCompare(b.name)
    },
    {
        title: 'Priority',
        key: 'priority',
        width: '30%',
        dataIndex: 'priority',
        render: (tag) => (
            TagColor(tag)
        ),
        filters: [
            {
                text: 'Urgent',
                value: 'Urgent',
            },
            {
                text: 'Regular',
                value: 'Regular',
            },
            {
                text: 'Trivial',
                value: 'Trivial',
            },
        ],
        onFilter: (value, record) => record.priority.indexOf(value) === 0,
        sorter: (a, b) => map.get(a.priority) - map.get(b.priority)


    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <AiFillEdit size={21} onClick={() => showModal(record)}></AiFillEdit>
                <AiFillDelete size={21} onClick={() => Swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        dispatch(DeleteItem(record.name))
                        Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        )
                    }
                })}></AiFillDelete>
            </Space >
        ),
    },
];
export default columns
