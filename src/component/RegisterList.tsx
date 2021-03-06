import React, {useState, useEffect} from 'react';
import { List, Typography, Avatar, Icon, Button } from 'antd';
import { CommonProps } from './../types/types';
import { useHistory } from "react-router-dom";
import TheFilter from './TheFilter';
const { Title } = Typography;



const RegisterList: React.FC<CommonProps> = (Props) => {
    const[filterName, setFilterName] = useState('');
    const[filterType, setFilterType] = useState('');
    const history = useHistory();

    useEffect(() => {
      console.log(Props.data)
    }, [Props.data]);

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
            {Props.showFilter && <TheFilter filterName={filterName} setFilterName={setFilterType} filterType={filterType} setFilterType={setFilterType}  showFilter={Props.showFilter}  setShowFilter={Props.setShowFilter}/>}
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

  