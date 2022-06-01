import React from 'react'
import { Select } from 'antd';

export default function PrioritySelect({ onChange, onSearch }) {
    const { Option } = Select;
    return (
        <>
            <Select
                className='Select'
                showSearch
                placeholder="Select a Priority"
                optionFilterProp="children"
                onChange={onChange}
                onSearch={onSearch}
                filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
            >

                <Option value="Urgent">Urgent</Option>
                <Option value="Regular">Regular</Option>
                <Option value="Trivial">Trivial</Option>
            </Select></>
    )
}
