import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import "./ErrorMessage.css";
export default function ErrorMessage({showError, context, ok}) {
    const [isModalOpen, setIsModalOpen] = useState(showError);

    const handleOk = () => {
        setIsModalOpen(false);
        ok();
      };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
      <>
        <Modal 
            open={isModalOpen} 
            onOk={handleOk} 
            onCancel={handleCancel}
            footer={[
                <Button key="back" onClick={handleOk}>
                  Return
                </Button>
            ]}
        >
            <div>{context}</div>
        </Modal>
      </>
    );
}
