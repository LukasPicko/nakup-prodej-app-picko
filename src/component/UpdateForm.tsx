import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom'
import {Form, Input,Select, InputNumber, Button} from 'antd';
import {DataProps} from '../types/types';
import { useHistory } from "react-router-dom";
import 'antd/dist/antd.css';
const { Option } = Select;

const UpdateForm: React.FC<DataProps> = (props) => {
    const [updFormName, setUpdFormName] = useState('');
    const [updFormType, setUpdFormType] = useState('');
    const [updFormPrice, setUpdFormPrice] = useState(0);
    const [updFormId, ] = useState(useParams<{ id: string }>().id);
    const [objectToUpd, setObjectToUpd] = useState(
        {
            "id": "",
            "type": "",
            "name": "",
            "price": 0,
        })
    
        const history = useHistory();
    
    useEffect(() => {

      
        let objTemp:any={id: '', type: '', name: '', price: 0};
        if(props.data!==undefined){objTemp = props.data.find(item => item.id === updFormId)}
       setUpdFormName(objTemp.name);
       setUpdFormType(objTemp.type);
       setUpdFormPrice(objTemp.price);
    }, []);

    // let myValidateStatus:string = 'succes';

    const handleChangeType = (value:string) => {
        setUpdFormType(value);
        alert(updFormType);
      }
   

    const handleSubmit = (event: any) => {
        event.preventDefault();
        console.log('submituju update form');

        setObjectToUpd(
            {
                id:updFormId,
                type:updFormType,
                name:updFormName,
                price:updFormPrice
            }
        );
        console.log('editovany object');
        console.log(objectToUpd);
        console.log('pred updatem');
        console.log(props.data);
        props.setData({...props.data, [updFormId]: objectToUpd});
        console.log('po updatu')
        console.log(props.data);
        
    }

    const handleChangeNumber = (value:any) => {
        // if(typeof value != "string"){console.log('error')}
        // if (!isNaN(value)&&!isNaN(parseFloat(value))){console.log('success')}
        setUpdFormPrice(parseFloat(value));
        console.log(updFormPrice);
        //"^-?\\d*(\\.\\d+)?$"
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
                        required
                  />
                 </Form.Item>
                 <Form.Item 
                    label="Typ transakce"
                 >
                  <Select id="addType" value={updFormType} style={{ width: 150 }} onChange={handleChangeType}>
                      <Option value="nakup">Nákup</Option>
                      <Option value="pronajem">Pronájem</Option>
                  </Select>
                  </Form.Item>
                  <Form.Item
                        label="Cena"
                  >
                        <InputNumber value={updFormPrice} onChange={handleChangeNumber}/>
                    </Form.Item>
                    <Button htmlType="submit" type="default" >Odeslat</Button>
            </Form>
        </div>
    );
  }
  
  export default UpdateForm;
