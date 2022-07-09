import React from 'react'
import Modal from 'antd/lib/modal/Modal'
import Input from 'antd/lib/input/Input'
import PrioritySelect from '../../PrioritySelect/PrioritySelect'
export default function EditModal({ isModalVisible, handleOk, handleCancel, EditValue, onSearch, onChange }) {
    return (
        <>
            <Modal title="Edit Job" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <Input className='Input' disabled placeholder="Job Title" value={EditValue} />
                <PrioritySelect onSearch={onSearch} onChange={onChange} width={"100%"}></PrioritySelect>
            </Modal>
        </>
    )
}
