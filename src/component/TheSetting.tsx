import React, {useState} from 'react';
import {Button, Modal} from 'antd';
import AddForm from './AddForm';
import 'antd/dist/antd.css';


interface Props {
    showFilter: boolean;
    setShowFilter: (value: boolean | ((prevVar: boolean) => boolean)) => any;
}


const TheSetting: React.FC<Props> = (Props) => {
    const [changeButton, setChangeButton] = useState(true);
    const [visibleModalForm, setVisibleModalForm] = useState(false);

    const handleOnOffFilter = () => {
        setChangeButton(!changeButton);
        Props.setShowFilter(!Props.showFilter)
    }

    const showModal = () => {
        setVisibleModalForm(true);
      };

    const handleOk = () => {
        setVisibleModalForm(false);
      };

    const handleCancel = () => {
        setVisibleModalForm(false);
      };
    return (
      <div>
          {changeButton && 
                    <Button onClick={handleOnOffFilter} type="primary" shape="circle" icon="filter" size='default' />
                }
                {!changeButton &&     
                    <Button onClick={handleOnOffFilter} type="default" shape="circle" icon="filter" size='default' />
                }
            <Button shape="round" onClick={showModal}>+Přidat</Button>{''}
            <Button shape="circle">Cz</Button>
            <Button shape="circle">En</Button>
            <Modal
                title="Přidat položku"
                visible={visibleModalForm}
                onOk={handleOk}
                onCancel={handleCancel}
                >
                    <AddForm/>
            </Modal>
      </div>
    );
  }
  
  export default TheSetting;