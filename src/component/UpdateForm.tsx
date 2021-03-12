import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom'
import {Form, Input,Select, InputNumber, Button, DatePicker} from 'antd';
import {DataProps} from '../types/types';
import { useHistory } from "react-router-dom";
import moment from 'moment';
import 'antd/dist/antd.css';
const { Option } = Select;



const UpdateForm: React.FC<DataProps> = (props) => {
    const [updName, setUpdName] = useState('');
    const [updType, setUpdType] = useState('');
    const [updPrice, setUpdPrice] = useState(0);
    const [updCurrency, setUpdCurrency] = useState('');
    const [updId, ] = useState(useParams<{ id: string }>().id);
    const [updDateOfAction, setUpdDateOfAction] = useState('');
    const [updDateOfRegister, setUpdDateOfRegister] = useState('');
    const [updDateOfReturn, setUpdDateOfReturn] = useState('');
    const [objectToUpd, setObjectToUpd] = useState(
        {
            "id": "",
            "type": "",
            "name": "",
            "price": 0,
            "currency": "",
            "dateOfAction":"",
            "dateOfRegister":"",
            "dateOfReturn":""
        })
        
        const history = useHistory();
    
    useEffect(() => {
        if(!updName){
        console.log('prazdny objTemp')
        let objTemp:any={id: '', type: '', name: '', price: 0, currency:'', dateOfAction:'', dateOfRegister:'', dateOfReturn:''};
        console.log(objTemp)
        if(props.data!==undefined){objTemp = props.data.find(item => item.id === updId)}
        console.log('plny objTemp')
        console.log(objTemp)
       setUpdName(objTemp.name);
       setUpdType(objTemp.type);
       setUpdPrice(objTemp.price);
       setUpdCurrency(objTemp.currency);
       setUpdDateOfAction(objTemp.dateOfAction);
       setUpdDateOfRegister(objTemp.dateOfRegister);
       setUpdDateOfReturn(objTemp.dateOfReturn);
    }

       console.log('props.data v useEffectu po updatu')
       console.log(props.data);

    }, [updName, updType, updPrice, updId, updCurrency, updDateOfAction, updDateOfRegister, updDateOfReturn, props.data]);

    
    const handleChangeType = (value:string) => {
        setUpdType(value);
      }

    const handleChangeCurrency = (value:string) => {setUpdCurrency(value)}
    
    const handleSubmit = (event: any) => {
        event.preventDefault();
        console.log('submituju update form');
        setObjectToUpd(
            {
                id:updId,
                type:updType,
                name:updName,
                price:updPrice,
                currency: updCurrency,
                dateOfAction: updDateOfAction,
                dateOfRegister: updDateOfRegister,
                dateOfReturn: updDateOfReturn
            }
        );
        console.log('editovany object');
        console.log(objectToUpd);
        console.log('pred updatem');
        console.log(props.data);
        props.setData(props.data.filter(item => item.id !== updId));
        props.setData(prevData => [...prevData, 
            {'id':updId,
             'type': updType,
             'name': updName,
             'price': updPrice,
             'currency': updCurrency,
             'dateOfAction':updDateOfAction,
             'dateOfRegister': updDateOfRegister,
             'dateOfReturn': updDateOfReturn   
            }]);
        console.log('po updatu')
        console.log(props.data);
    
        history.push("/");
        
    }
    
    const handleChangeNumber = (value:any) => {
        // if(typeof value != "string"){console.log('error')}
        // if (!isNaN(value)&&!isNaN(parseFloat(value))){console.log('success')}
        setUpdPrice(parseFloat(value));
        console.log(updPrice);
        //"^-?\\d*(\\.\\d+)?$"
    }

    const handleChangeDateOfAction = (date:any, dateString:string) => {
        setUpdDateOfAction(moment(date).format("YYYY-MM-DD"))
    }

    const handleChangeDateOfReturn = (date:any, dateString:string) => {
        setUpdDateOfReturn(moment(date).format("YYYY-MM-DD"))
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
                      value={updName}
                      onChange={(e: React.FormEvent<HTMLInputElement>) => setUpdName(e.currentTarget.value)}
                      style={{
                          width: 150,
                        }}
                        placeholder="Název položky"
                  />
                 </Form.Item>
                 <Form.Item 
                    label="Typ transakce"
                 >
                  <Select id="updType" value={updType} style={{ width: 150 }} onChange={handleChangeType}>
                      <Option value="nakup">Nákup</Option>
                      <Option value="pronajem">Pronájem</Option>
                      <Option value="zapujcka">Zápůjčka</Option>
                  </Select>
                  </Form.Item>
                  {(updType!=='zapujcka')&&<>
                  <Form.Item
                        label={(updType==='nakup')?'Cena':'Cena za měsíc'}
                  >
                        <InputNumber value={updPrice} onChange={handleChangeNumber}/>
                    </Form.Item>
                    <Form.Item >
                  <Select id="updCurrency" value={updCurrency} style={{ width: 150 }} onChange={handleChangeCurrency}>
                      <Option value="CZK">Kč</Option>
                      <Option value="EUR">€</Option>
                  </Select>
                  </Form.Item>
                  </>}
                  {(updType!=='zapujcka')&&<>
                  Termín vrácení
                  <Form.Item>
                      <DatePicker onChange={handleChangeDateOfReturn}/>
                  </Form.Item>
                  </>}
                  Uzavření smlouvy
                  <Form.Item>
                      <DatePicker onChange={handleChangeDateOfAction}/>
                  </Form.Item>
                    <Button htmlType="submit" type="default" >Odeslat</Button>
                    <Button type="default" onClick={()=>{handleClickDeleteRecord(updId)}}>Smaž položku</Button>
            </Form>
        </div>
    );
  }
  
  export default UpdateForm;

