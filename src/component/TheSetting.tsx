import React, {useState} from 'react';
import {Button, Modal} from 'antd';
import AddForm from './AddForm';
import 'antd/dist/antd.css';
import { CommonProps } from './../types/types';



const TheSetting: React.FC<CommonProps> = (Props) => {
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
                    <AddForm data={Props.data} setData={Props.setData}/>
            </Modal>
      </div>
    );
  }
  
  export default TheSetting;