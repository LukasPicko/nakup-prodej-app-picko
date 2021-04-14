import React, { useMemo } from "react";
import { Card, Typography } from "antd";
import { DataProps } from "../types/typesInterfaces";
import moment from "moment";
import _ from "lodash";
import { FormattedMessage, useIntl } from "react-intl";
import { TransactionType, FilteredDataType, LoanXtremesType } from "../types/pureTypes";
import {typesEnum} from './Enums/enums';
const { Text } = Typography;

let filteredData: FilteredDataType;
let loanXtremes: LoanXtremesType;

const filterTransaction = (data: TransactionType[]) => {
  return {
    purchasesOnly: data.filter((item) => item.type === typesEnum[0]),
    leasesOnly: data.filter((item) => item.type === typesEnum[1]),
    loansOnly: data.filter((item) => item.type === typesEnum[2]),
  };
};

const getExtremesDates = (data: TransactionType[]) => {
  let sorted = _.orderBy(data, ["dateOfReturn"], ["desc"]);
  return {
    max: sorted[0].dateOfReturn,
    min: sorted[sorted.length - 1].dateOfReturn,
  };
};

const getMaxPrice = (data: TransactionType[]) => {
  return Math.max(...data.map((item) => item.price));
};

const sumItems = (data: TransactionType[]) => {
  return data.map((item) => item.price).reduce((prev, curr) => prev + curr);
};

const avgItems = (data: TransactionType[]) => {
  return sumItems(data) / countItems(data);
};

const countItems = (data: TransactionType[]) => {
  return data.length;
};

const getSummaryResult = (
  filteredData: FilteredDataType,
  loanXtremes: LoanXtremesType
) => {
  return {
    purchaseMax: getMaxPrice(filteredData.purchasesOnly),
    purchaseSum: sumItems(filteredData.purchasesOnly),
    purchaseAvg: avgItems(filteredData.purchasesOnly),
    purchaseCount: countItems(filteredData.purchasesOnly),
    leaseMax: getMaxPrice(filteredData.leasesOnly),
    leaseSum: sumItems(filteredData.leasesOnly),
    leaseAvg: avgItems(filteredData.leasesOnly),
    leaseCount: countItems(filteredData.leasesOnly),
    loanMax: moment(loanXtremes.max).format("DD.MM.yyyy"),
    loanMin: moment(loanXtremes.min).format("DD.MM.yyyy"),
    loanCount: countItems(filteredData.loansOnly),
  };
};

const TheSummary: React.FC<DataProps> = (props) => {
  filteredData = filterTransaction(props.data);
  loanXtremes = getExtremesDates(filteredData.loansOnly);
  const summaryResult = useMemo(
    () => getSummaryResult(filteredData, loanXtremes),
    [props.data]
  );

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
