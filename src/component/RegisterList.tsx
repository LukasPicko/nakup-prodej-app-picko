import React, {useState, useEffect, useCallback} from 'react';
import { List, Typography, Avatar, Icon, Button } from 'antd';
import { CommonProps } from './../types/types';
import { useHistory } from "react-router-dom";
import TheFilter from './TheFilter';
const { Title } = Typography;

var storedFilterName:string, storedFilterType:string;
var stType = localStorage.getItem("storedFilterType");
var stName = localStorage.getItem("storedFilterName");
storedFilterType = stType ? stType : '#';
storedFilterName = stName ? stName : '';

//var storedFilterType:string = (localStorage.getItem("storedFilterType"))?localStorage.getItem("storedFilterType"):'#'
//var storedFilterName:string = (localStorage.getItem("storedFilterName"))?localStorage.getItem("storedFilterName"):''

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
    const[filterName, setFilterName] = useState(storedFilterName);
    const[filterType, setFilterType] = useState(storedFilterType);
    const[dataToShow, setDataToShow] = useState(Props.data);
    const history = useHistory();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    

    useEffect(() => {
      console.log('dataToShow')
      console.log(dataToShow)
      setDataToShow(filterResult(Props.data, filterName, filterType ))
      localStorage.setItem('storedFilterType', filterType);
      localStorage.setItem('storedFilterName', filterName);
      localStorage.setItem('storedData', JSON.stringify(Props.data));
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
                          <Avatar icon={(item.type==='Nákup')?'dollar':'clock-circle'} size={55} style={{backgroundColor: '#FF9F33'}}/>
                        }
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

  