import React, {useState, useEffect, useCallback} from 'react';
import { List, Typography, Avatar, Icon, Button } from 'antd';
import { CommonProps } from './../types/types';
import { useHistory } from "react-router-dom";
import TheFilter from './TheFilter';
const { Title } = Typography;

const filterResult = (data:{id: string; type: string; name: string; price: number;}[], filterName:string, filterType:string) => {
  if(!filterName&&filterType==='#'){return data}
  else if(!filterName){return filterTypeResult(data, filterType)}
  else if(filterType==='#'){return filterNameResult(data, filterName)}
  else {return filterNameResult(filterTypeResult(data, filterType), filterName)}
}

function filterNameResult(data:{id: string; type: string; name: string; price: number;}[], filterName:string):{id: string; type: string; name: string; price: number;}[]{
  return data.filter(item => item.name.includes(filterName))
}
function filterTypeResult(data:{id: string; type: string; name: string; price: number;}[], filterType:string):{id: string; type: string; name: string; price: number;}[]{
  return data.filter(item => item.type === filterType)
}

const RegisterList: React.FC<CommonProps> = (Props) => {
    const[filterName, setFilterName] = useState('');
    const[filterType, setFilterType] = useState('#');
    const[dataToShow, setDataToShow] = useState(Props.data);
    const history = useHistory();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    

    useEffect(() => {
      console.log('dataToShow')
      console.log(dataToShow)
      setDataToShow(filterResult(Props.data, filterName, filterType ))
    }, [filterType, filterName, Props.data]);

    
   

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
            {Props.showFilter && <TheFilter filterName={filterName} setFilterName={setFilterName} filterType={filterType} setFilterType={setFilterType}  showFilter={Props.showFilter}  setShowFilter={Props.setShowFilter}/>}
              <List 
                bordered
                dataSource={dataToShow}
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

  