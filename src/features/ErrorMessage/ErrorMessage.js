import { Modal } from 'antd';
import "./ErrorMessage.css";
export default function ErrorMessage({error, ok}) {
    const showModal= () => {
        Modal.error({
            title: error.title,
            content: (
                <div>
                    {error.context} 
                </div>
            ),
            onOk() {
                ok();
            },
        });
      };

    return (
      <>
        {showModal()}
      </>
    );
}
