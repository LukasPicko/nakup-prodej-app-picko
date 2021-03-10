import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom'
import {Form, Input,Select, InputNumber, Button, DatePicker} from 'antd';
import {DataProps} from '../types/types';
import { useHistory } from "react-router-dom";
import moment from 'moment';
import 'antd/dist/antd.css';
const { Option } = Select;



const UpdateForm: React.FC<DataProps> = (props) => {
    const [updFormName, setUpdFormName] = useState('');
    const [updFormType, setUpdFormType] = useState('');
    const [updFormPrice, setUpdFormPrice] = useState(0);
    const [updFormCurrency, setUpdFormCurrency] = useState('');
    const [updFormId, ] = useState(useParams<{ id: string }>().id);
    const [updDateOfAction, setUpdDateOfAction] = useState('');
    const [updDateOfRegister, setUpdDateOfRegister] = useState('');
    const [objectToUpd, setObjectToUpd] = useState(
        {
            "id": "",
            "type": "",
            "name": "",
            "price": 0,
            "currency": "",
            "dateOfAction":"",
            "dateOfRegister":""
        })
        
        const history = useHistory();
    
    useEffect(() => {
        if(!updFormName){
        console.log('prazdny objTemp')
        let objTemp:any={id: '', type: '', name: '', price: 0, currency:'', dateOfAction:'', dateOfRegister:''};
        console.log(objTemp)
        if(props.data!==undefined){objTemp = props.data.find(item => item.id === updFormId)}
        console.log('plny objTemp')
        console.log(objTemp)
       setUpdFormName(objTemp.name);
       setUpdFormType(objTemp.type);
       setUpdFormPrice(objTemp.price);
       setUpdFormCurrency(objTemp.currency);
       setUpdDateOfAction(objTemp.dateOfAction);
       setUpdDateOfRegister(objTemp.dateOfRegister);
    }

       console.log('props.data v useEffectu po updatu')
       console.log(props.data);

    }, [updFormName, updFormType, updFormPrice, updFormId, updFormCurrency, updDateOfAction, updDateOfRegister, props.data]);

    
    const handleChangeType = (value:string) => {
        setUpdFormType((value==='nakup')?"Nákup":"Pronájem");
      }

    const handleChangeCurrency = (value:string) => {setUpdFormCurrency(value)}
    
    const handleSubmit = (event: any) => {
        event.preventDefault();
        console.log('submituju update form');
        setObjectToUpd(
            {
                id:updFormId,
                type:updFormType,
                name:updFormName,
                price:updFormPrice,
                currency: updFormCurrency,
                dateOfAction: updDateOfAction,
                dateOfRegister: updDateOfRegister
            }
        );
        console.log('editovany object');
        console.log(objectToUpd);
        console.log('pred updatem');
        console.log(props.data);
        props.setData(props.data.filter(item => item.id !== updFormId));
        props.setData(prevData => [...prevData, 
            {'id':updFormId,
             'type': updFormType,
             'name': updFormName,
             'price': updFormPrice,
             'currency': updFormCurrency,
             'dateOfAction':updDateOfAction,
             'dateOfRegister': updDateOfRegister   
            }]);
        console.log('po updatu')
        console.log(props.data);
    
        history.push("/");
        
    }
    
    const handleChangeNumber = (value:any) => {
        // if(typeof value != "string"){console.log('error')}
        // if (!isNaN(value)&&!isNaN(parseFloat(value))){console.log('success')}
        setUpdFormPrice(parseFloat(value));
        console.log(updFormPrice);
        //"^-?\\d*(\\.\\d+)?$"
    }

    const handleChangeDate = (date:any, dateString:string) => {
        setUpdDateOfRegister(moment(date).format("YYYY-MM-DD"))
    }
    
    function handleClickDeleteRecord(id:any){
        let objTemp:any={id: '', type: '', name: '', price: 0};
      if(props.data!==undefined){objTemp = props.data.filter(item => item.id !== id)}
      props.setData(objTemp);
      history.push("/");
      } 

    return (
        <div>

            <h1>Editace zvolené položky</h1>
            <Form layout="vertical" id="filter" 
              onSubmit={handleSubmit}
            >
                <Form.Item
                    label="Název"
                >
                 <Input 
                      id="adName"
                      name="addName"
                      value={updFormName}
                      onChange={(e: React.FormEvent<HTMLInputElement>) => setUpdFormName(e.currentTarget.value)}
                      style={{
                          width: 150,
                        }}
                        placeholder="Název položky"
                  />
                 </Form.Item>
                 <Form.Item 
                    label="Typ transakce"
                 >
                  <Select id="updType" value={updFormType} style={{ width: 150 }} onChange={handleChangeType}>
                      <Option value="nakup">Nákup</Option>
                      <Option value="pronajem">Pronájem</Option>
                  </Select>
                  </Form.Item>
                  <Form.Item
                        label="Cena"
                  >
                        <InputNumber value={updFormPrice} onChange={handleChangeNumber}/>
                    </Form.Item>
                    <Form.Item >
                  <Select id="updCurrency" value={updFormCurrency} style={{ width: 150 }} onChange={handleChangeCurrency}>
                      <Option value="CZK">Kč</Option>
                      <Option value="EUR">€</Option>
                  </Select>
                  </Form.Item>
                  Uzavření smlouvy
                  <Form.Item>
                      <DatePicker onChange={handleChangeDate}/>
                  </Form.Item>
                    <Button htmlType="submit" type="default" >Odeslat</Button>
                    <Button type="default" onClick={()=>{handleClickDeleteRecord(updFormId)}}>Smaž položku</Button>
            </Form>
        </div>
    );
  }
  
  export default UpdateForm;

