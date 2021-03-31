import React, {useState} from 'react';
import {Button, Modal} from 'antd';
import AddForm from './AddForm';
import 'antd/dist/antd.css';
import { CommonProps } from './../types/types';
import CommonForm from './CommonForm';



const TheSetting: React.FC<CommonProps> = (Props) => {
    const [changeButton, setChangeButton] = useState(true);
//    const [visibleModalForm, setVisibleModalForm] = useState(false);

    const handleOnOffFilter = () => {
        setChangeButton(!changeButton);
        Props.setShowFilter(!Props.showFilter)
    }

    const showModal = () => {
        Props.setVisibleModalForm(!Props.visibleModalForm);
      };

    return (
      <div>
          {changeButton && 
                    <Button onClick={handleOnOffFilter} type="default" shape="circle" icon="filter" size='default' />
                }
                {!changeButton &&     
                    <Button onClick={handleOnOffFilter} type="primary" shape="circle" icon="filter" size='default'  style={{ background: '#FF9F33', borderColor: '#FF9F33' }}/>
                }
            <Button shape="round" onClick={showModal} style={{ background: '#FF9F33', borderColor: '#FF9F33', color: '#000000'}}>+Přidat</Button>{''}
            <Button shape="circle" style={{ background: '#FF9F33', borderColor: '#FF9F33', color: '#000000'}}>Cz</Button>
            <Button shape="circle" style={{ background: '#FF9F33', borderColor: '#FF9F33', color: '#000000' }}>En</Button>
            <Modal
                title="Přidat položku"
                visible={Props.visibleModalForm}
                onCancel={showModal}
                footer={null}
                >
                    <CommonForm data={Props.data} setData={Props.setData} visibleModalForm={Props.visibleModalForm} setVisibleModalForm={Props.setVisibleModalForm}/>
            </Modal>
      </div>
    );
  }
  
  export default TheSetting;