import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom'
import {Form, Input,Select, InputNumber, Button} from 'antd';
import {DataProps} from '../types/types';
import 'antd/dist/antd.css';
const { Option } = Select;

const UpdateForm: React.FC<DataProps> = (props) => {
    const [updFormName, setUpdFormName] = useState('');
    const [updFormType, setUpdFormType] = useState('');
    const [updFormPrice, setUpdFormPrice] = useState(0);
    const [objectToUpd, setObjectToUpd] = useState(
        {
            "id": "",
            "type": "",
            "name": "",
            "price": 0,
        })
    
    const {id} = useParams<{ id: string }>();

    useEffect(() => {
        let objTemp:{id: string; type: string; name: string; price: number;}={id: '', type: '', name: '', price: 0};
        if(props.data!==undefined){objTemp = props.data.find(item => item.id === id)}
        
       setUpdFormName(objTemp.id);
       setUpdFormType(objTemp.type);
       setUpdFormPrice(objTemp.price);
    }, []);

    let myValidateStatus:string = 'succes';

    const handleChangeFilterType = (value:string) => {
        setUpdFormType(value);
      }
   

    const handleSubmit = (event: any) => {
        event.preventDefault();
        setObjectToUpd({
            'id': Math.floor(Date.now() / 1000).toString(),
            'type': updFormType,
            'name': updFormName,
            'price': updFormPrice
        });
        console.log(objectToUpd);
        props.setData(
            (oldData => [...oldData, objectToUpd])
        );
        console.log(props.data);

    }

    const handleChangeNumber = (value:any) => {
        // if(typeof value != "string"){console.log('error')}
        // if (!isNaN(value)&&!isNaN(parseFloat(value))){console.log('success')}
        setUpdFormPrice(parseFloat(value));
        //"^-?\\d*(\\.\\d+)?$"
    }

        


    return (
        <div>

            <h1>update WOE</h1>
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
                  <Select id="addType" defaultValue="#" style={{ width: 150 }} onChange={handleChangeFilterType}>
                  <Option value="#"   disabled>Typ položky</Option>
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