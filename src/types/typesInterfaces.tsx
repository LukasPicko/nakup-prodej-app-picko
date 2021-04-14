
import {TransactionType} from '../types/pureTypes';

export interface FilterShowProps {
  showFilter: boolean;
  setShowFilter: (value: boolean | ((prevVar: boolean) => boolean)) => any;
}

export interface FilterValuesProps extends FilterShowProps {
  filterName: string;
  setFilterName: React.Dispatch<React.SetStateAction<string>>;
  filterType: string;
  setFilterType: React.Dispatch<React.SetStateAction<string>>;
  sorting: {
    item: string;
    direction: string;
  }[];
  setSorting: React.Dispatch<
    React.SetStateAction<
      {
        item: string;
        direction: string;
      }[]
    >
  >;
}

export interface DataProps {
  data: TransactionType[];
  setData: React.Dispatch<
    React.SetStateAction<
      TransactionType[]
    >
  >;
}

export interface DataModalProps extends DataProps {
  visibleModalForm: boolean;
  setVisibleModalForm: React.Dispatch<React.SetStateAction<boolean>>;
  language: string;
}

export interface CommonProps extends FilterShowProps, DataModalProps {
  language: string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
}
