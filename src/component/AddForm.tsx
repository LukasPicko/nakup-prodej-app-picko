import React, {useState} from 'react';
import {Form, Input,Select, InputNumber} from 'antd';
import {DataProps} from '../types/types';
import 'antd/dist/antd.css';
const { Option } = Select;

const AddForm: React.FC<DataProps> = (props) => {
    const [addFormName, setAddFormName] = useState('');
    const [addFormType, setAddFormType] = useState('');
    const [objectToAdd, setObjectToAdd] = useState(
        {
            "id": "",
            "type": "",
            "name": "",
            "price": 0,
        })

    let myValidateStatus:string = 'succes';

    const handleChangeFilterType = (value:string) => {
        setAddFormType(value);
      }
   

    const handleSubmit = (event: any) => {
        event.preventDefault();
        alert('name ' + addFormName + ' type ' + addFormType);
    }

    const handleChangeNumber = (value:any) => {
        if(typeof value != "string"){console.log('error')}
        if (!isNaN(value)&&!isNaN(parseFloat(value))){console.log('success')}
    }

        //"^-?\\d*(\\.\\d+)?$"


    return (
        <div>
            <Form layout="vertical" id="filter" 
              onSubmit={handleSubmit}
            >
                <Form.Item
                    label="Název"
                >
                 <Input 
                      id="adName"
                      name="addName"
                      value={addFormName}
                      onChange={(e: React.FormEvent<HTMLInputElement>) => setAddFormName(e.currentTarget.value)}
                      style={{
                          width: 150,
                        }}
                        placeholder="Název položky"
                  />
                 </Form.Item>
                 <Form.Item 
                    label="Typ transakce"
                 >
                  <Select id="addType" defaultValue="#" style={{ width: 150 }} onChange={handleChangeFilterType}>
                  <Option value="#"   disabled>Typ položky</Option>
                      <Option value="nakup">Nákup</Option>
                      <Option value="pronajem">Pronájem</Option>
                  </Select>
                  </Form.Item>
                  <Form.Item
                        label="Cena"
                  
                  >
                        <InputNumber />
                    </Form.Item>
                  
                    
                     
            </Form>
        </div>
    );
  }
  
  export default AddForm;