
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Select, Space, Table, Tag } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React, { useRef, useState, useEffect } from 'react';
import Highlighter from 'react-highlight-words';
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { AddItem, DeleteItem, EditItem, TableEditItem } from '../../redux/slices/tableslice';
import "./Home.scss";
const { Option } = Select;


export default function Home() {
    const TableSlc = useSelector(state => state.TableSlc);
    const dispatch = useDispatch()

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [Item, setItem] = useState({ name: "", priority: "" })
    const [EditItemValue, setEditItemValue] = useState({ name: "", priority: "" })
    const searchInput = useRef(null);
    const prioritylist = ["Urgent", "Regular", "Trivial"]
    const map = new Map();

    useEffect(() => {
        prioritylist.forEach((x, i) => map.set(x, i))
    }, [TableSlc])


    const showModal = (value) => {
        setEditItemValue(value)
        setIsModalVisible(true);
    };
    const handleOk = () => {
        dispatch(EditItem(EditItemValue))
        setIsModalVisible(false);
    };
    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };
    const onChangeItemPriority = (value) => {
        setItem({ ...Item, priority: value })
    };
    const onChangeEditItemPriority = (value) => {
        setEditItemValue({ ...EditItemValue, priority: value })
    };
    const onSearch = (value) => {
        console.log('search:', value);
    };
    const onChangeItemName = (value) => {
        setItem({ ...Item, name: value })
    };
    const AddItemJob = () => {
        if (Item.name.length > 0 && Item.priority.length > 0) {
            const result = TableSlc.Data.filter(element => element.name === Item.name);
            if (result.length == 0) {
                dispatch(AddItem(Item))
            }
            else {
                toast.error("A Job with this name has been opened before")
            }
        }
        else {
            toast.error("Please input's your Job Name and Password")
        }
    };
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




    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div
                style={{
                    padding: 8,
                }}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}

                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1890ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });





    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <div>{text}</div>,
            ...getColumnSearchProps('name'),
            sorter: (a, b) => a.name.localeCompare(b.name)
        },
        {
            title: 'Priority',
            key: 'priority',
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

    return (
        <>
            {/*Main*/}
            <div className='Job-Traking-Main'>
                <div className='Add-Job'>
                    <h3 className='Title'>Create New Job</h3>
                    <div className='Row'>
                        <Input className='Input' placeholder="Job Title" onChange={(e) => onChangeItemName(e.target.value)} />
                        <Select
                            className='Select'
                            showSearch
                            placeholder="Select a Priority"
                            optionFilterProp="children"
                            onChange={onChangeItemPriority}
                            onSearch={onSearch}
                            filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                        >
                            <Option value="Urgent">Urgent</Option>
                            <Option value="Regular">Regular</Option>
                            <Option value="Trivial">Trivial</Option>
                        </Select>
                        <Button className='Button' type="primary" onClick={() => AddItemJob()}>Create</Button>
                    </div>
                </div>
                <div className='Table'>
                    <h3 className='Title'>Job List</h3>
                    <Table style={{ height: "100%" }} columns={columns} dataSource={TableSlc.Data} />
                </div>
            </div >
            {/*Modal*/}
            <Modal title="Edit Job" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <Input className='Input' disabled placeholder="Job Title" value={EditItemValue.name} />
                <Select
                    style={{ width: "100%", marginTop: "1%" }}
                    className='Select'
                    showSearch
                    placeholder="Select a Priority"
                    optionFilterProp="children"
                    onChange={onChangeEditItemPriority}
                    onSearch={onSearch}
                    value={EditItemValue.priority}
                    filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                >
                    <Option value="Urgent">Urgent</Option>
                    <Option value="Regular">Regular</Option>
                    <Option value="Trivial">Trivial</Option>
                </Select>
            </Modal>
        </>

    )
}
