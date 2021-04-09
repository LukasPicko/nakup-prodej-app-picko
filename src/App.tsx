import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import { PageHeader, message } from "antd";
import TheNavigation from "./component/TheNavigation";
import "./App.css";
import TheSummary from "./component/TheSummary";
import TheSetting from "./component/TheSetting";
import CommonForm from "./component/CommonForm";
import RegisterList from "./component/RegisterList";
import { IntlProvider } from "react-intl";
import locale_en from "./compiled-lang/en.json";
import locale_cz from "./compiled-lang/cz.json";

const locales = {
  cz: locale_cz,
  en: locale_en,
};

let data = localStorage.getItem("storedData");
if (data) {
  var purchases = JSON.parse(data);
} else {
  purchases = [
    {
      id: "c6cc568e-4141-4aea-9273-a7849ab20776",
      type: "pronajem",
      name: "prvnijmeno",
      price: 10,
      currency: "CZK",
      dateOfAction: "2021-03-08",
      dateOfRegister: "2021-03-10",
    },
    {
      id: "90e7c81e-ad7a-4f99-9ee6-f4a73182dc93",
      type: "nakup",
      name: "druhejmeno",
      price: 100,
      currency: "CZK",
      dateOfAction: "2021-03-07",
      dateOfRegister: "2021-03-11",
    },
    {
      id: "abee251c-78c8-4c0c-bf1c-a4c962e8b0de",
      type: "pronajem",
      name: "tretijmeno",
      price: 1000,
      currency: "EUR",
      dateOfAction: "2021-03-06",
      dateOfRegister: "2021-03-12",
    },
  ];
}
const App: React.FC = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [data, setData] = useState(purchases);
  const [visibleModalForm, setVisibleModalForm] = useState(false);
  const [linesCNB, setLinesCNB] = useState([{}]);
  const [cnbDate, setCNBDate] = useState("");
  const [language, setLanguage] = useState("cz");

  function txtToArray(text: string) {
    //debugger;
    let arrayOfObjects: {}[] = [];
    let linesArray: string[] = text.trim().split("\n");
    setCNBDate(() => linesArray[0].substring(0, 10));
    localStorage.setItem("cnbDate", cnbDate);
    for (let index = 2; index < linesArray.length; index++) {
      let line = linesArray[index].trim().split("|");
      let objTemp = {
        country: line[0],
        currency: line[1],
        count: line[2],
        code: line[3],
        rate: line[4],
      };
      arrayOfObjects.push(objTemp);
    }
    localStorage.setItem("storedCNBdata", JSON.stringify(arrayOfObjects));
    setLinesCNB(arrayOfObjects);
  }

  useEffect(() => {
    fetch(
      "http://www.cnb.cz/cs/financni_trhy/devizovy_trh/kurzy_devizoveho_trhu/denni_kurz.txt",
      {
        method: "GET",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain; charset=UTF-8",
        },
      }
    )
      .then((r) => r.text())
      .then((text) => {
        console.log("fetch pokus");
        console.log(text);
        //debugger;
        txtToArray(text);
      })
      .catch((error) => {
        console.log(error);
        alert("text CNB nefetchuju");
      });
  }, []);

  const locales = {
    cz: locale_cz,
    en: locale_en,
  };

  return (
    <IntlProvider
      locale={language}
      defaultLocale="cz"
      //@ts-ignore
      messages={locales[language]}
    >
      <TheNavigation />
      <PageHeader
        title={
          language === "cz" ? "NÁKUPY A PRONÁJMY" : "PURCHASES AND RENTALS"
        }
        extra={[
          <TheSetting
            showFilter={showFilter}
            setShowFilter={setShowFilter}
            data={data}
            setData={setData}
            visibleModalForm={visibleModalForm}
            setVisibleModalForm={setVisibleModalForm}
            language={language}
            setLanguage={setLanguage}
          />,
        ]}
      ></PageHeader>
      <main>
        <Switch>
          <Route path="/" exact>
            <RegisterList
              showFilter={showFilter}
              setShowFilter={setShowFilter}
              data={data}
              setData={setData}
              visibleModalForm={visibleModalForm}
              setVisibleModalForm={setVisibleModalForm}
              language={language}
              setLanguage={setLanguage}
            />
          </Route>

          <Route path="/summary">
            <TheSummary data={data} setData={setData} />
          </Route>
          <Route path="/:id">
            <CommonForm
              data={data}
              setData={setData}
              visibleModalForm={visibleModalForm}
              setVisibleModalForm={setVisibleModalForm}
              language={language}
            />
          </Route>
        </Switch>
      </main>
    </IntlProvider>
  );
};

export default App;
