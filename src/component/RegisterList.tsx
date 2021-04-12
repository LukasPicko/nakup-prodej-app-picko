import React, { useState, useEffect, MouseEvent } from "react";
import { List, Typography, Avatar, Button } from "antd";
import { CommonProps } from "./../types/types";
import { useHistory } from "react-router-dom";
import moment from "moment";
import _ from "lodash";
import TheFilter from "./TheFilter";
import { typesOfCurrency } from "./Enums/enums";
import { FormattedMessage, useIntl } from "react-intl";
const { Title } = Typography;
const { Paragraph } = Typography;

var storedFilterName: string,
  storedFilterType: string,
  storedSorting: { item: string; direction: string }[];
var stType = localStorage.getItem("storedFilterType");
var stName = localStorage.getItem("storedFilterName");
var stSort = localStorage.getItem("storedSorting");
storedFilterType = stType ? stType : "#";
storedFilterName = stName ? stName : "";
storedSorting = stSort
  ? JSON.parse(stSort)
  : [
      { item: "name", direction: "asc" },
      { item: "type", direction: "asc" },
    ];

const filterResult = (
  data: {
    id: string;
    type: string;
    name: string;
    price: number;
    currency: string;
    dateOfAction: string;
    dateOfRegister: string;
    dateOfReturn: string;
  }[],
  filterName: string,
  filterType: string
) => {
  if (!filterName && filterType === "#") {
    return data;
  } else if (!filterName) {
    return filterTypeResult(data, filterType);
  } else if (filterType === "#") {
    return filterNameResult(data, filterName);
  } else {
    return filterNameResult(filterTypeResult(data, filterType), filterName);
  }
};

function filterNameResult(
  data: {
    id: string;
    type: string;
    name: string;
    price: number;
    currency: string;
    dateOfAction: string;
    dateOfRegister: string;
    dateOfReturn: string;
  }[],
  filterName: string
): {
  id: string;
  type: string;
  name: string;
  price: number;
  currency: string;
  dateOfAction: string;
  dateOfRegister: string;
  dateOfReturn: string;
}[] {
  return data.filter((item) => item.name.includes(filterName));
}
function filterTypeResult(
  data: {
    id: string;
    type: string;
    name: string;
    price: number;
    currency: string;
    dateOfAction: string;
    dateOfRegister: string;
    dateOfReturn: string;
  }[],
  filterType: string
): {
  id: string;
  type: string;
  name: string;
  price: number;
  currency: string;
  dateOfAction: string;
  dateOfRegister: string;
  dateOfReturn: string;
}[] {
  return data.filter((item) => item.type === filterType);
}

function sortDataToShow(
  data: {
    id: string;
    type: string;
    name: string;
    price: number;
    currency: string;
    dateOfAction: string;
    dateOfRegister: string;
    dateOfReturn: string;
  }[],
  sorting: { item: string; direction: string }[]
) {
  if (sorting[0].item === "price") {
    let purchase = data.filter((item) => item.type === "nakup");
    let lease = data.filter((item) => item.type === "pronajem");
    let loan = data.filter((item) => item.type === "zapujcka");
    purchase =
      sorting[0].direction === "asc"
        ? _.orderBy(
            purchase,
            [sorting[0].item, sorting[1].item],
            ["asc", "asc"]
          )
        : _.orderBy(
            purchase,
            [sorting[0].item, sorting[1].item],
            ["desc", "asc"]
          );
    lease =
      sorting[0].direction === "asc"
        ? _.orderBy(lease, [sorting[0].item, sorting[1].item], ["asc", "asc"])
        : _.orderBy(lease, [sorting[0].item, sorting[1].item], ["desc", "asc"]);
    return [...purchase, ...lease, ...loan];
  } else {
    return sorting[0].direction === "asc"
      ? _.orderBy(data, [sorting[0].item, sorting[1].item], ["asc", "asc"])
      : _.orderBy(data, [sorting[0].item, sorting[1].item], ["desc", "asc"]);
  }
}

const RegisterList: React.FC<CommonProps> = (Props) => {
  const [filterName, setFilterName] = useState(storedFilterName);
  const [filterType, setFilterType] = useState(storedFilterType);
  const [sorting, setSorting] = useState(storedSorting);
  const [dataToShow, setDataToShow] = useState(Props.data);
  const [showButton, setShowButton] = useState("");
  const [editable, setEditable] = useState("");
  const history = useHistory();
  const intl = useIntl();

  useEffect(() => {
    setDataToShow(() =>
      sortDataToShow(filterResult(Props.data, filterName, filterType), sorting)
    );
    localStorage.setItem("storedFilterType", filterType);
    localStorage.setItem("storedFilterName", filterName);
    localStorage.setItem("storedSorting", JSON.stringify(sorting));
    localStorage.setItem("storedData", JSON.stringify(Props.data));
  }, [filterType, filterName, sorting, Props.data]);

  function handleClickDeleteRecord(id: any) {
    let objTemp: any = { id: "", type: "", name: "", price: 0 };
    if (Props.data !== undefined) {
      objTemp = Props.data.filter((item) => item.id !== id);
    }
    Props.setData(objTemp);
  }

  function editRecordForm(value: string) {
    history.push("/" + value);
  }

  function editRecordName(value: string, id: string) {
    let cloneData = Props.data.map((item) => item);
    let objIndex = cloneData.findIndex((obj) => obj.id === id);
    cloneData[objIndex].name = value;
    Props.setData(cloneData);
    setEditable("");
  }

  const showMe = (e: MouseEvent) => {
    setShowButton(e.currentTarget.id);
  };

  const hideMe = () => {
    setShowButton("");
  };

  return (
    <div className="demo-infinite-container">
      {Props.showFilter && (
        <TheFilter
          filterName={filterName}
          setFilterName={setFilterName}
          filterType={filterType}
          setFilterType={setFilterType}
          showFilter={Props.showFilter}
          setShowFilter={Props.setShowFilter}
          sorting={sorting}
          setSorting={setSorting}
        />
      )}
      <List
        bordered
        dataSource={dataToShow}
        renderItem={(item) => (
          <List.Item
            key={item.id}
            id={item.id}
            onMouseOver={showMe}
            onMouseLeave={hideMe}
          >
            <List.Item.Meta
              avatar={
                <Avatar
                  icon={
                    item.type === "nakup"
                      ? "dollar"
                      : item.type === "pronajem"
                      ? "clock-circle"
                      : "issues-close"
                  }
                  size={55}
                  style={{ backgroundColor: "#FF9F33" }}
                />
              }
              title={
                <Title level={4} id={item.id}>
                  <span
                    onClick={() => {
                      editRecordForm(item.id);
                    }}
                  >
                    <Paragraph
                    
                      editable={{
                        editing: editable === item.id,
                        onChange: (value) => {
                          editRecordName(value, item.id);
                        },
                      }}
                    >
                      {item.name}
                    </Paragraph>
                  </span>
                </Title>
              }
              description={
                item.type === "nakup"
                  ? intl.formatMessage({
                      id: "reLiSubtitlePurchase",
                      defaultMessage: "Nákup",
                      description:
                        "description of type on list item - purchase",
                    })
                  : item.type === "pronajem"
                  ? intl.formatMessage({
                      id: "reLiSubtitleLease",
                      defaultMessage: "Pronájem",
                      description: "description of type on list item - lease",
                    })
                  : intl.formatMessage({
                      id: "reLiSubtitleLoan",
                      defaultMessage: "Zápůjčka",
                      description: "description of type on list item - loan",
                    })
              }
            />

            <div style={{ marginRight: 20 }}>
              <p>
                <FormattedMessage
                  id="reLiActionFrom"
                  defaultMessage="Platnost od :"
                  description="title dateOfAction"
                />
              </p>
              <p>{moment(item.dateOfAction).format("DD.MM.YYYY")}</p>
            </div>

            <div style={{ marginRight: 20 }}>
              <p>
                <FormattedMessage
                  id="reLiRegisterFrom"
                  defaultMessage="V registru od :"
                  description="title dateOfRegister"
                />
              </p>
              <p>{moment(item.dateOfRegister).format("DD.MM.YYYY")}</p>
            </div>

            {item.type !== "zapujcka" && (
              <>
                <div style={{ marginRight: 20 }}>
                  {item.price + " "}
                  {
                    //@ts-ignore
                    typesOfCurrency[item.currency]
                  }
                  {item.type === "pronajem" && (
                    <FormattedMessage
                      id="reLiPerMonth"
                      defaultMessage="/měsíc"
                      description="per month suffix"
                    />
                  )}
                </div>
              </>
            )}
            {item.type === "zapujcka" && (
              <>
                <div style={{ marginRight: 20 }}>
                  <p>
                    <FormattedMessage
                      id="reLiReturnTo"
                      defaultMessage="Termín vrácení :"
                      description="title dateOfReturn"
                    />
                  </p>
                  <p>{moment(item.dateOfReturn).format("DD.MM.YYYY")}</p>
                </div>
              </>
            )}

            {showButton === item.id && (
              <>
                <Button id={item.id} onClick={() => setEditable(item.id)}>
                  Změnit
                </Button>
                <Button
                  id={item.id}
                  style={{ borderWidth: 0 }}
                  onClick={() => {
                    handleClickDeleteRecord(item.id);
                  }}
                >
                  X
                </Button>
              </>
            )}
          </List.Item>
        )}
      ></List>
    </div>
  );
};

export default RegisterList;
