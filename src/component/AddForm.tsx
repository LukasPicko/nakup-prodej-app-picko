import React, {useState, useEffect} from 'react';
import {Form, Input,Select, InputNumber, Button, DatePicker} from 'antd';
import { useHistory } from "react-router-dom";
import {DataModalProps} from '../types/types';
import { v4 as uuidv4 } from 'uuid';
import 'antd/dist/antd.css';
import moment from 'moment';
const { Option } = Select;




const AddForm: React.FC<DataModalProps> = (props) => {
    const [addFormName, setAddFormName] = useState('');
    const [addFormType, setAddFormType] = useState('#');
    const [addFormPrice, setAddFormPrice] = useState(0);
    const [addFormCurrency, setAddFormCurrency] = useState('');
    const [addFormDateOfAction, setAddFormDateOfAction] = useState(()=>nowDate())
    const [addFormDateOfRegister, setAddFormDateOfRegister] = useState(()=>nowDate())
    const history = useHistory();

    function nowDate(){return moment(Date.now()).format('YYYY-MM-DD')}

        useEffect(() => {
       
    
        }, [addFormName, addFormType, addFormPrice, addFormCurrency, addFormDateOfAction, addFormDateOfRegister, props.data]);

    const handleChangeFormType = (value:string) => {
        setAddFormType((value==='nakup')?'Nákup':'Pronájem');
      }

    const handleChangeFormCurrency = (value:string) => {setAddFormCurrency(value)}
   

    const handleSubmit = (event: any) => {
        event.preventDefault();
        props.setData(
            (oldData =>  [...oldData, 
                {
                'id': uuidv4(),
                'type': addFormType,
                'name': addFormName,
                'price': addFormPrice,
                'currency': addFormCurrency,
                'dateOfAction': addFormDateOfAction,
                'dateOfRegister': addFormDateOfRegister


            }
                ]));
        
        setAddFormName('');
        setAddFormType('');
        setAddFormPrice(0);
        setAddFormCurrency('');
        setAddFormDateOfAction(nowDate());

        props.setVisibleModalForm(false);
        history.push("/");

    }

    const handleChangeNumber = (value:any) => {
        // if(typeof value != "string"){console.log('error')}
        // if (!isNaN(value)&&!isNaN(parseFloat(value))){console.log('success')}
        setAddFormPrice(parseFloat(value));
        //"^-?\\d*(\\.\\d+)?$"
    }

      
    const handleChangeDate = (date:any, dateString:string) => {
        setAddFormDateOfAction(moment(date).format("YYYY-MM-DD"))
    }


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
                  <Select id="addType" value={addFormType} style={{ width: 150 }} onChange={handleChangeFormType}>
                      <Option value="#"  disabled>Typ položky</Option>
                      <Option value="nakup">Nákup</Option>
                      <Option value="pronajem">Pronájem</Option>
                  </Select>
                  </Form.Item>
                  
                  <Form.Item
                        label="Cena"
                  >
                        <InputNumber value={addFormPrice} onChange={handleChangeNumber}/>
                    </Form.Item>
                    <Form.Item>
                    <Select id="addCurrency" value={addFormCurrency} style={{ width: 150 }} onChange={handleChangeFormCurrency}>
                      <Option value=""  disabled>Měna</Option>
                      <Option value="CZK">Kč</Option>
                      <Option value="EUR">€</Option>
                  </Select>
                  </Form.Item>
                  Uzavření smlouvy
                  <Form.Item>
                      <DatePicker onChange={handleChangeDate} value={moment(addFormDateOfAction)}/>
                  </Form.Item>
                    <Button htmlType="submit" type="default" >Odeslat</Button>
            </Form>
        </div>
    );
  }
  
  export default AddForm;