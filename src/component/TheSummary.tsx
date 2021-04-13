import React, { useMemo } from "react";
import { Card, Typography } from "antd";
import { DataProps } from "../types/typesInterfaces";
import moment from "moment";
import _ from "lodash";
import { FormattedMessage, useIntl } from "react-intl";
import {dataOnlyType} from '../types/pureTypes';
const { Text } = Typography;

const loanMaxMin = (
  data: dataOnlyType,
  extreme: string
) => {
  let sorted = _.orderBy(data, ["dateOfReturn"], ["desc"]);
  if (extreme === "max") {
    return moment(sorted[0].dateOfReturn).format("DD.MM.YYYY");
  } else {
    return moment(sorted[sorted.length - 1].dateOfReturn).format("DD.MM.YYYY");
  }
};

const maxFce = (
  data: dataOnlyType,
  itemType: string
) => {
  return Math.max(
    ...data.filter((item) => item.type === itemType).map((item) => item.price)
  );
};

const sumItems = (
  data: dataOnlyType,
  itemType: string
) => {
  return data
    .filter((item) => item.type === itemType)
    .map((item) => item.price)
    .reduce((prev, curr) => prev + curr);
};

const avgItems = (
  data: dataOnlyType,
  itemType: string
) => {
  return sumItems(data, itemType) / data.filter((item) => item.type === itemType).length;
};

const countItems = (
  data: dataOnlyType,
  par: string
) => {
  return data.filter((item) => item.type === par).length;
};

const TheSummary: React.FC<DataProps> = (props) => {
  const summaryResult = useMemo(()=> ({
    purchaseMax: maxFce(props.data, "nakup"),
    purchaseSum: sumItems(props.data, "nakup"),
    purchaseAvg: avgItems(props.data, "nakup"),
    purchaseCount: countItems(props.data, "nakup"),
    leaseMax: maxFce(props.data, "pronajem"),
    leaseSum: sumItems(props.data, "pronajem"),
    leaseAvg: avgItems(props.data, "pronajem"),
    leaseCount: countItems(props.data, "pronajem"),
    loanMax: loanMaxMin(props.data, "max"),
    loanMin: loanMaxMin(props.data, "min"),
    loanCount: countItems(props.data, "zapujcka"),
  }),[props.data]);

  const intl = useIntl();

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
            values={{ purchaseMax: summaryResult.purchaseMax }}
          />
        </Text>
        <br />
        <Text>
          <FormattedMessage
            id="sumPurchAvg"
            defaultMessage="Nákupy průměrná cena {purchaseAvg}"
            description="avg price of purchases"
            values={{ purchaseAvg: summaryResult.purchaseAvg }}
          />
        </Text>
        <br />
        <Text>
          <FormattedMessage
            id="sumPurchSum"
            defaultMessage="Nákupy celková cena {purchaseSum}"
            description="sum of prices of purchases"
            values={{ purchaseSum: summaryResult.purchaseSum }}
          />
        </Text>
        <br />
        <Text>
          <FormattedMessage
            id="sumPurchCount"
            defaultMessage="Nákupy počet {purchaseCount}"
            description="count of purchases"
            values={{ purchaseCount: summaryResult.purchaseCount }}
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
            values={{ leaseMax: summaryResult.leaseMax }}
          />
        </Text>
        <br />
        <Text>
          <FormattedMessage
            id="sumLeaseAvg"
            defaultMessage="Pronájmy průměrná cena {leaseAvg}"
            description="avg price of leases"
            values={{ leaseAvg: summaryResult.leaseAvg }}
          />
        </Text>
        <br />
        <Text>
          <FormattedMessage
            id="sumLeaseSum"
            defaultMessage="Pronájmy celková cena {leaseSum}"
            description="sum price of leases"
            values={{ leaseSum: summaryResult.leaseSum }}
          />
        </Text>
        <br />
        <Text>
          <FormattedMessage
            id="sumLeaseCount"
            defaultMessage="Pronájmy počet {leaseCount}"
            description="count of leases"
            values={{ leaseCount: summaryResult.leaseCount }}
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
            values={{ loanMin: summaryResult.loanMin }}
          />
        </Text>
        <br />
        <Text>
          <FormattedMessage
            id="sumLoanLast"
            defaultMessage="Zápůjčky vrátit nejpozději: {loanMax}"
            description="loan return last"
            values={{ loanMax: summaryResult.loanMax }}
          />
        </Text>
        <br />
        <Text>
          <FormattedMessage
            id="sumLoanCount"
            defaultMessage="Zápůjčky počet {loanCount}"
            description="count of loans"
            values={{ loanCount: summaryResult.loanCount }}
          />
        </Text>
      </Card>
    </Card>
  );
};

export default TheSummary;
