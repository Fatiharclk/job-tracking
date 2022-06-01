
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Tag, Tooltip } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import EditModal from '../../components/Modals/EditModal/EditModal';
import PrioritySelect from '../../components/PrioritySelect/PrioritySelect';
import JobTable from '../../components/Table/JobTable';
import { AddItem, DeleteItem, EditItem, getJobData } from '../../redux/slices/tableslice';
import { AiFillInfoCircle } from "react-icons/ai"
import "./Home.scss";



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

    useEffect(() => {
        if (TableSlc.Data.length == 0) {
            dispatch(getJobData())
        }
    }, [])

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


    //Priortiy Colors
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



    //Search Data Function
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


    return (
        <>
            {/*Main*/}
            <div className='Job-Traking-Main'>
                <div className='Add-Job'>
                    <div className='Title-Row'>
                        <h3 className='Title'>Create New Job </h3>
                        <Tooltip title='Add "Job Title" and "Priorty" after Click "Creat"'>
                            <AiFillInfoCircle className='Icon' size={18}></AiFillInfoCircle>
                        </Tooltip>
                    </div>
                    <div className='Row'>
                        <Input className='Input' placeholder="Job Title" onChange={(e) => onChangeItemName(e.target.value)} />
                        <PrioritySelect onSearch={onSearch} onChange={onChangeItemPriority}></PrioritySelect>
                        <Button className='Button' type="primary" onClick={() => AddItemJob()}>Create</Button>
                    </div>
                </div>
                <div className='Table'>
                    <h3 className='Title'>Job List</h3>
                    <JobTable data={TableSlc.Data} TagColor={TagColor} map={map} getColumnSearchProps={getColumnSearchProps}
                        showModal={showModal} dispatch={dispatch} DeleteItem={DeleteItem} Swal={Swal} ></JobTable>
                </div>
            </div >
            <EditModal isModalVisible={isModalVisible} handleOk={handleOk} handleCancel={handleCancel}
                EditValue={EditItemValue.name} onSearch={onSearch} onChange={onChangeEditItemPriority}></EditModal>

        </>

    )
}
