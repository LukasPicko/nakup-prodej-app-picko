import React, { useState, useEffect } from "react";
import { Form, Input, Select, InputNumber, Button, DatePicker } from "antd";
import { useHistory, useParams } from "react-router-dom";
import { DataModalProps } from "../types/typesInterfaces";
import { v4 as uuidv4 } from "uuid";
import { FormattedMessage, useIntl } from "react-intl";
import "antd/dist/antd.css";
import moment from "moment";
const { Option } = Select;

const CommonForm: React.FC<DataModalProps> = (props) => {
  const [formItemId, setFormItemId] = useState(
    useParams<{ id: string }>().id || ""
  );
  const [formItemName, setFormItemName] = useState("");
  const [formItemType, setFormItemType] = useState("");
  const [formItemPrice, setFormItemPrice] = useState(0);
  const [formItemCurrency, setFormItemCurrency] = useState("");
  const [formItemDateOfAction, setFormItemDateOfAction] = useState(() =>
    nowDate()
  );
  const [formItemDateOfRegister, setFormItemDateOfRegister] = useState(() =>
    nowDate()
  );
  const [formItemDateOfReturn, setFormItemDateOfReturn] = useState(() =>
    nowDate()
  );
  const [formItemAction, setFormItemAction] = useState("");
  const [firstTimeInUseEffect, setFirstTime] = useState(true);

  const history = useHistory();
  const intl = useIntl();

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
      objTemp = props.data.find(
        (item: { id: string }) => item.id === formItemId
      );

      setFormItemName(() => objTemp.name);
      setFormItemPrice(() => objTemp.price);
      setFormItemCurrency(() => objTemp.currency);
      setFormItemType(() => objTemp.type);
      setFormItemDateOfAction(() => objTemp.dateOfAction);
      setFormItemDateOfRegister(() => objTemp.dateOfRegister);
      setFormItemDateOfReturn(() => objTemp.dateOfReturn);
      setFirstTime(() => false);
      setFormItemAction(() => "upd");
    }
  }

  useEffect(() => {
    if (firstTimeInUseEffect) {
      if (formItemId) {
        fillVariables();
      } else {
        setFormItemAction(() => "add");
      }
    }
  }, [
    formItemName,
    formItemType,
    formItemPrice,
    formItemCurrency,
    formItemDateOfAction,
    formItemDateOfRegister,
    formItemDateOfReturn,
  ]);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (formItemAction === "upd") {
      props.setData(
        props.data.filter((item: { id: string }) => item.id !== formItemId)
      );
    }
    props.setData((oldData: any) => [
      ...oldData,
      {
        id: formItemAction === "add" ? uuidv4() : formItemId,
        type: formItemType,
        name: formItemName,
        price: formItemPrice,
        currency: formItemCurrency,
        dateOfAction: formItemDateOfAction,
        dateOfRegister: formItemDateOfRegister,
        dateOfReturn: formItemDateOfReturn,
      },
    ]);
    if (formItemAction === "add") props.setVisibleModalForm(false);
    setFormItemId(() => "");
    setFormItemName(() => "");
    setFormItemPrice(() => 0);
    setFormItemCurrency(() => "");
    setFormItemType(() => "");
    setFormItemDateOfAction(() => "");
    setFormItemDateOfRegister(() => "");
    setFormItemDateOfReturn(() => "");
    setFirstTime(() => true);
    setFormItemAction(() => "upd");
    history.push("/");
  };

  const handleChangePrice = (value: any) => {
    setFormItemPrice(parseFloat(value));
  };

  const handleChangeDateOfAction = (date: any) => {
    setFormItemDateOfAction(moment(date).format("YYYY-MM-DD"));
  };

  const handleChangeDateOfReturn = (date: any) => {
    setFormItemDateOfReturn(moment(date).format("YYYY-MM-DD"));
  };

  const handleChangeType = (value: string) => {
    setFormItemType(value);
  };

  const handleChangeCurrency = (value: string) => {
    setFormItemCurrency(value);
  };

  function handleClickDeleteRecord(id: any) {
    let objTemp: any = { id: "", type: "", name: "", price: 0 };
    if (props.data !== undefined) {
      objTemp = props.data.filter((item: { id: any }) => item.id !== id);
    }
    props.setData(objTemp);
    history.push("/");
  }

  return (
    <div>
      {formItemAction === "upd" && (
        <h2>
          <FormattedMessage
            id="formEditRecord"
            defaultMessage="Editace zvolené položky"
            description="form title edit record"
          />
        </h2>
      )}
      <Form layout="vertical" id="filter" onSubmit={handleSubmit}>
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
            value={formItemName}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setFormItemName(e.currentTarget.value)
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
            value={formItemType}
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
        {formItemType !== "zapujcka" && (
          <>
            <Form.Item
              label={
                formItemType === "nakup"
                  ? intl.formatMessage({
                      id: "formPriceLabel",
                      defaultMessage: "Cena",
                      description: "price label in form",
                    })
                  : intl.formatMessage({
                      id: "formPricePerMonthLabel",
                      defaultMessage: "Cena za měsíc",
                      description: "price per month label in form",
                    })
              }
            >
              <InputNumber value={formItemPrice} onChange={handleChangePrice} />
            </Form.Item>
            <FormattedMessage
              id="formTitleCurrency"
              defaultMessage="Měna"
              description="formTitleCurrency"
            />
            <Form.Item>
              <Select
                id="updCurrency"
                value={formItemCurrency}
                style={{ width: 150 }}
                onChange={handleChangeCurrency}
              >
                <Option value="CZK">Kč</Option>
                <Option value="EUR">€</Option>
              </Select>
            </Form.Item>
          </>
        )}
        {formItemType === "zapujcka" && (
          <>
            <FormattedMessage
              id="formTitleReturn"
              defaultMessage="Termín vrácení"
              description="formTitleReturn"
            />
            <Form.Item>
              <DatePicker
                defaultValue={moment(formItemDateOfReturn)}
                // disabledDate={moment(formItemDateOfAction) => {
                //   return  time > moment(formItemAction);
                // }}
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
            defaultValue={moment(formItemDateOfAction)}
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
        {formItemAction === "upd" && (
          <Button
            type="default"
            onClick={() => {
              handleClickDeleteRecord(formItemId);
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
