import React, {useState} from 'react';
import { List, Typography, Avatar, Icon, Button } from 'antd';
const { Title } = Typography;



  interface Props {
    data: {
        id: string;
        type: string;
        name: string;
        price: number;
    }[],
    setData: React.Dispatch<React.SetStateAction<{
        id: string;
        type: string;
        name: string;
        price: number;
    }[]>>
  }

const RegisterList: React.FC<Props> = (Props) => {
    //const [data, setData] = useState(purchases);
    const [rewriteText, setRewriteText] = useState('');

    function handleCLick(itemId: string, itemName: string) {
        let newArr = Props.data.map((item) => {
            if (itemId == item.id) {
                return { ...item, ['name']: itemName };
            } else {
                return item;
            }
        });
        Props.setData(newArr);
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
                            {(item.type=='Nákup')&&<Icon type="dollar" theme="twoTone"/>}
                            {(item.type=='Pronájem')&&<Icon type="clock-circle" theme="twoTone" />}
                        </Avatar>}
                      title={<Title
                        editable={{
                            onChange: setRewriteText,
                          }}
                      level={4} >{item.name}</Title>}

                      description={item.type}
                    />
                    <div>{item.price} {(item.type=='Nákup') ? ' Kč':'Kč/měsíc'}</div>
                    <Button onClick={(event: React.MouseEvent<HTMLElement>) => 
                        {handleCLick('001', 'ani hovno')}}>
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

  