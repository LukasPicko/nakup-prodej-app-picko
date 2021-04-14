export type TransactionType = {
  id: string;
  type: string;
  name: string;
  price: number;
  currency: string;
  dateOfAction: string;
  dateOfRegister: string;
  dateOfReturn: string;
};

export type FilteredDataType = {
  purchasesOnly: TransactionType[];
  leasesOnly: TransactionType[];
  loansOnly: TransactionType[];
};

export type LoanXtremesType = { min: string; max: string };
