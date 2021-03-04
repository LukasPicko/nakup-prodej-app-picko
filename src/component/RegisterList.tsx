import React, {} from 'react';
import { List, Typography, Avatar, Icon, Button } from 'antd';
import { DataProps } from './../types/types';
import { useHistory } from "react-router-dom";
const { Title } = Typography;



const RegisterList: React.FC<DataProps> = (Props) => {
    const history = useHistory();
    function handleClickDeleteRecord(id:any){
          let objTemp:any={id: '', type: '', name: '', price: 0};
        if(Props.data!==undefined){objTemp = Props.data.filter(item => item.id !== id)}
        Props.setData(objTemp);
        }

        function editRecordForm(value:string){
          history.push('/'+ value)
        }
        return (
          <div className="demo-infinite-container">
              <List 
                bordered
                dataSource={Props.data}
                renderItem={item => (
                  <List.Item key={item.id}>
                    <List.Item.Meta
                      avatar={
                        <Avatar>
                            {(item.type==='Nákup')&&<Icon type="dollar" theme="twoTone"/>}
                            {(item.type==='Pronájem')&&<Icon type="clock-circle" theme="twoTone" />}
                        </Avatar>}
                      title={
                        <Title level={4} ><span onClick= {() => {editRecordForm(item.id)}}>{item.name}</span></Title>}
                      description={item.type}
                    />
                    <div>{item.price}{(item.type==='Nákup') ? ' Kč':'Kč/měsíc'}</div>
                    <Button onClick={()=>{handleClickDeleteRecord(item.id)}}>X</Button>
                  </List.Item>
                )}
              > 
              </List>
          </div>
        );
      
}

export default RegisterList;

  