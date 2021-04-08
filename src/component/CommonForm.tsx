import React, { useState, useEffect } from "react";
import { Form, Input, Select, InputNumber, Button, DatePicker } from "antd";
import { useHistory, useParams } from "react-router-dom";
import { DataModalProps } from "../types/types";
import { v4 as uuidv4 } from "uuid";
import { FormattedMessage, useIntl, injectIntl } from "react-intl";
import { typesOfPricesCZ, typesOfPricesEN } from "./Enums/enums";
import "antd/dist/antd.css";
import moment from "moment";
//import { FormComponentProps } from 'antd/lib/form/Form';
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
  const intl = useIntl();

  function nowDate() {
    return moment(Date.now()).format("YYYY-MM-DD");
  }

  //const { getFieldDecorator } = props.form;

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
      objTemp = props.data.find((item: { id: string; }) => item.id === foId);

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
      } else {
        setFoAction(() => "add");
      }
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
      props.setData(props.data.filter((item: { id: string; }) => item.id !== foId));
    }
    props.setData((oldData: any) => [
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
      objTemp = props.data.filter((item: { id: any; }) => item.id !== id);
    }
    props.setData(objTemp);
    history.push("/");
  }

  return (
    <div>
      {foAction === "upd" && (
        <h2>
          <FormattedMessage
            id="formEditRecord"
            defaultMessage="Editace zvolené položky"
            description="form title edit record"
          />
        </h2>
      )}
      <Form layout="vertical" id="filter" onSubmit={handleSubmit}>
<<<<<<< HEAD
        <Form.Item
          label={intl.formatMessage({
            id: "formName",
            defaultMessage: "Název",
            description: "form title of name",
          })}
        >
          <Input
            id="adName"
            name="addName"
=======
        <Form.Item label="Název">
       <Input
            id="name"
            name="name"
>>>>>>> fdf2176ab72097468fec484ac1196d7a2c492da9
            value={foName}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setFoName(e.currentTarget.value)
            }
            style={{
              width: 150,
            }}
            placeholder={intl.formatMessage({
              id: "formNamePlaceholder",
              defaultMessage: "Název položky",
              description: "form placeholder of name",
            })}
          />
        </Form.Item>
        <Form.Item
          label={intl.formatMessage({
            id: "formType",
            defaultMessage: "Typ položky",
            description: "form title of type",
          })}
        >
          <Select
            id="updType"
            value={foType}
            style={{ width: 150 }}
            onChange={handleChangeType}
          >
            <Option value="nakup">
              <FormattedMessage
                id="formSelecNakup"
                defaultMessage="Nákup"
                description="formSelectNakup"
              />
            </Option>

            <Option value="pronajem">
              <FormattedMessage
                id="formSelectPronajem"
                defaultMessage="Pronájem"
                description="formSelectPronajem"
              />
            </Option>
            <Option value="zapujcka">
              <FormattedMessage
                id="formSelectZapujcka"
                defaultMessage="Zápůjčka"
                description="formSelectZapujcka"
              />
            </Option>
          </Select>
        </Form.Item>
        {foType !== "zapujcka" && (
          <>
            <Form.Item
              label={
                props.language === "cz"
                  ? //@ts-ignore
                    typesOfPricesCZ[foType]
                  : //@ts-ignore
                    typesOfPricesEN[foType]
              }
            >
              <InputNumber value={foPrice} onChange={handleChangeNumber} />
            </Form.Item>
            <FormattedMessage
              id="formTitleCurrency"
              defaultMessage="Měna"
              description="formTitleCurrency"
            />
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
            <FormattedMessage
              id="formTitleReturn"
              defaultMessage="Termín vrácení"
              description="formTitleReturn"
            />
            <Form.Item>
              <DatePicker
                onChange={handleChangeDateOfReturn}
                placeholder={intl.formatMessage({
                  id: "formReturnDatePlaceholder",
                  defaultMessage: "Datum",
                  description: "formReturnDatePlaceholder",
                })}
              />
            </Form.Item>
          </>
        )}
        <FormattedMessage
          id="formTitleContract"
          defaultMessage="Uzavření smlouvy"
          description="formTitleContract"
        />
        <Form.Item>
          <DatePicker
            onChange={handleChangeDateOfAction}
            placeholder={intl.formatMessage({
              id: "formContractDatePlaceholder",
              defaultMessage: "Datum",
              description: "formContractnDatePlaceholder",
            })}
          />
        </Form.Item>
        <Button htmlType="submit" type="default">
          <FormattedMessage
            id="formSubmitButton"
            defaultMessage="Odeslat"
            description="formSubmitButton"
          />
        </Button>
        {foAction === "upd" && (
          <Button
            type="default"
            onClick={() => {
              handleClickDeleteRecord(foId);
            }}
          >
            <FormattedMessage
              id="formEraseButton"
              defaultMessage="Smaž položku"
              description="formEraseButton"
            />
          </Button>
        )}
      </Form>
    </div>
  );
};

export default CommonForm;
