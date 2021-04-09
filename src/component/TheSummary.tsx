import React, { useState, useEffect } from "react";
import { Card, Typography } from "antd";
import { DataProps } from "./../types/types";
import moment from "moment";
import _ from "lodash";
import { FormattedMessage, useIntl } from "react-intl";
const { Text } = Typography;



const TheSummary: React.FC<DataProps> = (props) => {
  const [purchaseMax, setPurchaseMax] = useState(0);
  const [purchaseSum, setPurchaseSum] = useState(0);
  const [purchaseAvg, setPurchaseAvg] = useState(0);
  const [purchaseCount, setPurchaseCount] = useState(0);
  const [leaseMax, setLesaeMax] = useState(0);
  const [leaseSum, setLeaseSum] = useState(0);
  const [leaseAvg, setLeaseAvg] = useState(0);
  const [leaseCount, setLeaseCount] = useState(0);
  const [loanMin, setLoanMin] = useState("");
  const [loanMax, setLoanMax] = useState("");
  const [loanCount, setLoanCount] = useState(0);

  const [summaryResult, setSummaryResult] = useState (
    {purchaseMax: 0,
      purchaseSum: 0,
      purchaseAvg: 0,
      purchaseCount: 0,
      leaseMax: 0,
      leaseSum: 0,
      leaseAvg: 0,
      leaseCount: 0,
      loanMax: "",
      loanMin: "",
      loanCount: 0
    }
  );
  const intl = useIntl();

  useEffect(() => {
    setPurchaseMax(maxFce("nakup"));
    setPurchaseSum(sumFce("nakup"));
    setPurchaseAvg(avgFce("nakup"));
    setPurchaseCount(countFce("nakup"));
    setLesaeMax(maxFce("pronajem"));
    setLeaseSum(sumFce("pronajem"));
    setLeaseAvg(avgFce("pronajem"));
    setLeaseCount(countFce("pronajem"));
    setLoanMax(loanMaxMin("max"));
    setLoanMin(loanMaxMin("min"));
    setLoanCount(countFce("zapujcka"));
  }, []);

  const loanMaxMin = (extreme: string,) => {
    let sorted = _.orderBy(props.data, ["dateOfReturn"], ["desc"]);
    if (extreme === "max") {
      return moment(sorted[0].dateOfReturn).format("DD.MM.YYYY");
    } else {
      return moment(sorted[sorted.length - 1].dateOfReturn).format(
        "DD.MM.YYYY"
      );
    }
  };

  const maxFce = (par: string) => {
    return Math.max(
      ...props.data
        .filter((item) => item.type === par)
        .map((item) => item.price)
    );
  };

  const sumFce = (par: string) => {
    return props.data
      .filter((item) => item.type === par)
      .map((item) => item.price)
      .reduce((prev, curr) => prev + curr);
  };

  const avgFce = (par: string) => {
    return sumFce(par) / props.data.filter((item) => item.type === par).length;
  };

  const countFce = (par: string) => {
    return props.data.filter((item) => item.type === par).length;
  };

  return (
    <Card
      title={intl.formatMessage({
        id: "sumTitle",
        defaultMessage: "Sumář",
        description: "title of summary",
      })}
    >
      <Card
        type="inner"
        title={intl.formatMessage({
          id: "sumPurchases",
          defaultMessage: "Nákupy",
          description: "title of purchases",
        })}
      >
        <Text>
          <FormattedMessage
            id="sumPurchMax"
            defaultMessage="Nákupy maximální cena {purchaseMax}"
            description="max price of purchases"
            values={{ purchaseMax }}
          />
        </Text>
        <br />
        <Text>
          <FormattedMessage
            id="sumPurchAvg"
            defaultMessage="Nákupy průměrná cena {purchaseAvg}"
            description="avg price of purchases"
            values={{ purchaseAvg }}
          />
        </Text>
        <br />
        <Text>
          <FormattedMessage
            id="sumPurchSum"
            defaultMessage="Nákupy celková cena {purchaseSum}"
            description="sum of prices of purchases"
            values={{ purchaseSum }}
          />
        </Text>
        <br />
        <Text>
          <FormattedMessage
            id="sumPurchCount"
            defaultMessage="Nákupy počet {purchaseCount}"
            description="count of purchases"
            values={{ purchaseCount }}
          />
        </Text>
      </Card>
      <Card
        style={{ marginTop: 16 }}
        type="inner"
        title={intl.formatMessage({
          id: "sumLease",
          defaultMessage: "Pronájmy",
          description: "title of lease",
        })}
      >
        <Text>
          <FormattedMessage
            id="sumLeaseMax"
            defaultMessage="Pronájmy maximální cena {leaseMax}"
            description="max price of leases"
            values={{ leaseMax }}
          />
        </Text>
        <br />
        <Text>
          <FormattedMessage
            id="sumLeaseAvg"
            defaultMessage="Pronájmy průměrná cena {leaseAvg}"
            description="avg price of leases"
            values={{ leaseAvg }}
          />
        </Text>
        <br />
        <Text>
          <FormattedMessage
            id="sumLeaseSum"
            defaultMessage="Pronájmy celková cena {leaseSum}"
            description="sum price of leases"
            values={{ leaseSum }}
          />
        </Text>
        <br />
        <Text>
          <FormattedMessage
            id="sumLeaseCount"
            defaultMessage="Pronájmy počet {leaseCount}"
            description="count of leases"
            values={{ leaseCount }}
          />
        </Text>
      </Card>
      <Card
        style={{ marginTop: 16 }}
        type="inner"
        title={intl.formatMessage({
          id: "sumLoans",
          defaultMessage: "Zápůjčky",
          description: "title of loans",
        })}
      >
        <Text>
          <FormattedMessage
            id="sumLoanFirst"
            defaultMessage="Zápůjčky vrátit nejříve: {loanMin}"
            description="loan return first"
            values={{ loanMin }}
          />
        </Text>
        <br />
        <Text>
          <FormattedMessage
            id="sumLoanLast"
            defaultMessage="Zápůjčky vrátit nejpozději: {loanMax}"
            description="loan return last"
            values={{ loanMax }}
          />
        </Text>
        <br />
        <Text>
          <FormattedMessage
            id="sumLoanCount"
            defaultMessage="Zápůjčky počet {loanCount}"
            description="count of loans"
            values={{ loanCount }}
          />
        </Text>
      </Card>
    </Card>
  );
};

export default TheSummary;

//export default injectIntl(TheSummary);
