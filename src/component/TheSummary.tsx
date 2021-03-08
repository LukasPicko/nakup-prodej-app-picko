import React, {useState, useEffect} from 'react';
import {Card, Typography} from 'antd';
import { DataProps } from './../types/types';
const {Text} = Typography;

const TheSummary: React.FC<DataProps> = (props) => {

    const[purchaseMax, setPurchaseMax] = useState(0)
    const[purchaseSum, setPurchaseSum] = useState(0)
    const[purchaseAvg, setPurchaseAvg] = useState(0)
    const[purchaseCount, setPurchaseCount] = useState(0)
    const[leaseMax, setLesaeMax] = useState(0)
    const[leaseSum, setLeaseSum] =useState(0)
    const[leaseAvg, setLeaseAvg] = useState(0)
    const[leaseCount, setLeaseCount] = useState(0)

    useEffect(() => {
      setPurchaseMax(maxFce('Nákup'));
      setPurchaseSum(sumFce('Nákup'));
      setPurchaseAvg(avgFce('Nákup'));
      setPurchaseCount(countFce('Nákup'));
      setLesaeMax(maxFce('Pronájem'));
      setLeaseSum(sumFce('Pronájem'));
      setLeaseAvg(avgFce('Pronájem'));
      setLeaseCount(countFce('Pronájem'));

    },[]);

    const maxFce = (par:string) => {
      return  Math.max(...props.data.filter(item => item.type===par).map(item => (item.price)))
    }

    const sumFce = (par:string) => {
      return props.data.filter(item => item.type===par).map(item => item.price).reduce((prev, curr) => prev + curr)
    }

    const avgFce = (par:string) => {
      return sumFce(par)/props.data.filter(item => item.type===par).length
    }

    const countFce = (par:string) => {
      return props.data.filter(item => item.type===par).length
    }


    return (
      <Card title="Sumář">
        <Card type="inner" title="Nákupy">
          <Text>Nákupy maximální cena {purchaseMax}</Text>
          <br />
          <Text>Nákupy průměrná cena {purchaseAvg}</Text>
          <br />
          <Text>Nákupy celková cena {purchaseSum}</Text>
          <br />
          <Text>Nákupy počet {purchaseCount}</Text>
        </Card>
        <Card
          style={{ marginTop: 16 }}
          type="inner"
          title="Pronájmy"
        >
          <Text>Pronájmy maximální cena {leaseMax}</Text>
          <br />
          <Text>Pronájmy průměrná cena {leaseAvg}</Text>
          <br />
          <Text>Pronájmy celková cena {leaseSum}</Text>
          <br />
          <Text>Pronájmy počet {leaseCount}</Text>
          
          
        </Card>
  </Card>
    );
  }
  
  export default TheSummary;