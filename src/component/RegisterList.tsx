import React, { useState, useEffect } from "react";
import { List, Typography, Avatar, Button } from "antd";
import { CommonProps } from "./../types/types";
import { useHistory } from "react-router-dom";
import moment from "moment";
import _ from "lodash";
import TheFilter from "./TheFilter";
const { Title } = Typography;

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
  const history = useHistory();

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
          <List.Item key={item.id}>
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
                <Title level={4}>
                  <span
                    onClick={() => {
                      editRecordForm(item.id);
                    }}
                  >
                    {item.name}
                  </span>
                </Title>
              }
              description={
                item.type === "nakup"
                  ? "Nákup"
                  : item.type === "pronajem"
                  ? "Pronájem"
                  : "Zápůjčka"
              }
            />

            <div style={{ marginRight: 20 }}>
              <p>Platnost od :</p>
              <p>{moment(item.dateOfAction).format("DD.MM.YYYY")}</p>
            </div>

            <div style={{ marginRight: 20 }}>
              <p>V registru od :</p>
              <p>{moment(item.dateOfRegister).format("DD.MM.YYYY")}</p>
            </div>

            {item.type !== "zapujcka" && (
              <>
                <div style={{ marginRight: 20 }}>
                  {item.price}
                  {item.type === "nakup"
                    ? " " + item.currency
                    : " " + item.currency + "/měsíc"}
                </div>
              </>
            )}
            {item.type === "zapujcka" && (
              <>
                <div style={{ marginRight: 20 }}>
                  <p>Termín vrácení :</p>
                  <p>{moment(item.dateOfReturn).format("DD.MM.YYYY")}</p>
                </div>
              </>
            )}

            <Button
              style={{ borderWidth: 0 }}
              onClick={() => {
                handleClickDeleteRecord(item.id);
              }}
            >
              X
            </Button>
          </List.Item>
        )}
      ></List>
    </div>
  );
};

export default RegisterList;
