import React, {useState} from 'react';
import { List, Typography, Avatar, Icon, Button } from 'antd';
import { DataProps } from './../types/types';
import { useHistory } from "react-router-dom";
const { Title } = Typography;



const RegisterList: React.FC<DataProps> = (Props) => {
    const [rewriteText, setRewriteText] = useState('');
    const history = useHistory();

    function handleCLickChangeButton(itemId: string, itemName: string) {
        let newArr = Props.data.map((item) => {
            if (itemId === item.id) {
                return { ...item, ['name']: itemName };
            } else {
                return item;
            }
        });
        Props.setData(newArr);
    }

        function editRecordForm(value:string){
          alert('newString' + value);
          history.push('/'+{value})
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
                      title={<Title
                        editable={{
                          }}
                      level={4} ><span onClick= {() => {editRecordForm(item.id)}}>{item.name}</span></Title>}

                      description={item.type}
                    />
                    <div>{item.price} {(item.type==='Nákup') ? ' Kč':'Kč/měsíc'}</div>
                    <Button onClick={(event: React.MouseEvent<HTMLElement>) => 
                        {handleCLickChangeButton(item.id, item.name)}}>
                            Změň
                    </Button>
                    <Button>X</Button>
                  </List.Item>
                )}
              > 
              </List>
          </div>
        );
      
}

export default RegisterList;

  