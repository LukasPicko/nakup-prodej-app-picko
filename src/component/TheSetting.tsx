import React, { useState } from "react";
import { Button, Modal } from "antd";
import "antd/dist/antd.css";
import { CommonProps } from "./../types/types";
import CommonForm from "./CommonForm";

import { FormattedMessage, useIntl, injectIntl } from "react-intl";

const TheSetting: React.FC<CommonProps> = (Props) => {
  const [changeButton, setChangeButton] = useState(true);

  const intl = useIntl();

  const styles = {
    background: "#FF9F33",
    borderColor: "#FF9F33",
    color: "#000000",
  };

  const handleOnOffFilter = () => {
    setChangeButton(!changeButton);
    Props.setShowFilter(!Props.showFilter);
  };

  const showModal = () => {
    Props.setVisibleModalForm(!Props.visibleModalForm);
  };

  const setCz = () => {
    Props.setLanguage("cz");
  };

  const setEn = () => {
    Props.setLanguage("en");
  };

  return (
    <div>
      {changeButton && (
        <Button
          onClick={handleOnOffFilter}
          type="default"
          shape="circle"
          icon="filter"
          size="default"
        />
      )}
      {!changeButton && (
        <Button
          onClick={handleOnOffFilter}
          type="primary"
          shape="circle"
          icon="filter"
          size="default"
          style={{ background: "#FF9F33", borderColor: "#FF9F33" }}
        />
      )}
      <Button shape="round" onClick={showModal} style={styles}>
        <FormattedMessage
          id="settAddButton"
          defaultMessage="+Přidat"
          description="desc of button to add record"
        />
      </Button>
      {""}
      <Button shape="circle" onClick={() => setCz()} style={styles}>
        Cz
      </Button>
      <Button shape="circle" onClick={() => setEn()} style={styles}>
        En
      </Button>
      <Modal
        title="Přidat položku"
        visible={Props.visibleModalForm}
        onCancel={showModal}
        footer={null}
      >
        <CommonForm
          data={Props.data}
          setData={Props.setData}
          visibleModalForm={Props.visibleModalForm}
          setVisibleModalForm={Props.setVisibleModalForm}
          language={Props.language}
        />
      </Modal>
    </div>
  );
};

export default TheSetting;
