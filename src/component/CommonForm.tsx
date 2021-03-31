import React, { useState, useEffect } from "react";
import { Form, Input, Select, InputNumber, Button, DatePicker } from "antd";
import { useHistory, useParams } from "react-router-dom";
import { DataModalProps } from "../types/types";
import { v4 as uuidv4 } from "uuid";
import "antd/dist/antd.css";
import moment from "moment";
const { Option } = Select;

const CommonForm: React.FC<DataModalProps> = (props) => {
  const [foId] = useState(useParams<{ id: string }>().id || "");
  const [foName, setFoName] = useState("");
  const [foType, setFoType] = useState("");
  const [foPrice, setFoPrice] = useState(0);
  const [foCurrency, setFoCurrency] = useState("");
  const [foDateOfAction, setFoDateOfAction] = useState(() => nowDate());
  const [foDateOfRegister, setFoDateOfRegister] = useState(() => nowDate());
  const [foDateOfReturn, setFoDateOfReturn] = useState(() => nowDate());
  const [foAction, setFoAction] = useState("");
  const [firstTime, setFirstTime] = useState(true);

  const history = useHistory();

  function nowDate() {
    return moment(Date.now()).format("YYYY-MM-DD");
  }

  function fillVariables() {
    let objTemp: any = {
      id: "",
      type: "",
      name: "",
      price: 0,
      currency: "",
      dateOfAction: "",
      dateOfRegister: "",
      dateOfReturn: "",
    };
    if (props.data !== undefined) {
      objTemp = props.data.find((item) => item.id === foId);

      setFoName(() => objTemp.name);
      setFoPrice(() => objTemp.price);
      setFoCurrency(() => objTemp.currency);
      setFoType(() => objTemp.type);
      setFoDateOfAction(() => objTemp.dateOfAction);
      setFoDateOfRegister(() => objTemp.dateOfRegister);
      setFoDateOfReturn(() => objTemp.dateOfReturn);
      setFirstTime(() => !firstTime);
      setFoAction(() => "upd");
    } 
  }

  useEffect(() => {
    if (firstTime) {
      if (foId) {
        fillVariables();
      }
      else{setFoAction(() => "add");}
    }
  }, [
    foName,
    foType,
    foPrice,
    foCurrency,
    foDateOfAction,
    foDateOfRegister,
    foDateOfReturn,
  ]);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (foAction === "upd") {
      props.setData(props.data.filter((item) => item.id !== foId));
    }
    props.setData((oldData) => [
      ...oldData,
      {
        id: foAction === "add" ? uuidv4() : foId,
        type: foType,
        name: foName,
        price: foPrice,
        currency: foCurrency,
        dateOfAction: foDateOfAction,
        dateOfRegister: foDateOfRegister,
        dateOfReturn: foDateOfReturn,
      },
    ]);
    if (foAction === "add") props.setVisibleModalForm(false);
    history.push("/");
  };

  const handleChangeNumber = (value: any) => {
    setFoPrice(parseFloat(value));
  };

  const handleChangeDateOfAction = (date: any, dateString: string) => {
    setFoDateOfAction(moment(date).format("YYYY-MM-DD"));
  };

  const handleChangeDateOfReturn = (date: any, dateString: string) => {
    setFoDateOfReturn(moment(date).format("YYYY-MM-DD"));
  };

  const handleChangeType = (value: string) => {
    setFoType(value);
  };

  const handleChangeCurrency = (value: string) => {
    setFoCurrency(value);
  };

  function handleClickDeleteRecord(id: any) {
    let objTemp: any = { id: "", type: "", name: "", price: 0 };
    if (props.data !== undefined) {
      objTemp = props.data.filter((item) => item.id !== id);
    }
    props.setData(objTemp);
    history.push("/");
  }

  return (
    <div>
      {foAction === "upd" && <h1>Editace zvolené položky</h1>}
      <Form layout="vertical" id="filter" onSubmit={handleSubmit}>
        <Form.Item label="Název">
          <Input
            id="adName"
            name="addName"
            value={foName}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setFoName(e.currentTarget.value)
            }
            style={{
              width: 150,
            }}
            placeholder="Název položky"
          />
        </Form.Item>
        <Form.Item label="Typ transakce">
          <Select
            id="updType"
            value={foType}
            style={{ width: 150 }}
            onChange={handleChangeType}
          >
            <Option value="nakup">Nákup</Option>
            <Option value="pronajem">Pronájem</Option>
            <Option value="zapujcka">Zápůjčka</Option>
          </Select>
        </Form.Item>
        {foType !== "zapujcka" && (
          <>
            <Form.Item label={foType === "nakup" ? "Cena" : "Cena za měsíc"}>
              <InputNumber value={foPrice} onChange={handleChangeNumber} />
            </Form.Item>
            Měna
            <Form.Item>
              <Select
                id="updCurrency"
                value={foCurrency}
                style={{ width: 150 }}
                onChange={handleChangeCurrency}
              >
                <Option value="CZK">Kč</Option>
                <Option value="EUR">€</Option>
              </Select>
            </Form.Item>
          </>
        )}
        {foType === "zapujcka" && (
          <>
            Termín vrácení
            <Form.Item>
              <DatePicker onChange={handleChangeDateOfReturn} />
            </Form.Item>
          </>
        )}
        Uzavření smlouvy
        <Form.Item>
          <DatePicker onChange={handleChangeDateOfAction} />
        </Form.Item>
        <Button htmlType="submit" type="default">
          Odeslat
        </Button>
        {foAction === "upd" && (
          <Button
            type="default"
            onClick={() => {
              handleClickDeleteRecord(foId);
            }}
          >
            Smaž položku
          </Button>
        )}
      </Form>
    </div>
  );
};

export default CommonForm;
