export interface FilterShowProps {
  showFilter: boolean;
  setShowFilter: (value: boolean | ((prevVar: boolean) => boolean)) => any;
}

export interface FilterValuesProps extends FilterShowProps{
  filterName: string;
  setFilterName: React.Dispatch<React.SetStateAction<string>>;
  filterType: string;
  setFilterType: React.Dispatch<React.SetStateAction<string>>;
  sorting: {
    item: string;
    direction: string;
  }[];
  setSorting: React.Dispatch<React.SetStateAction<{
    item: string;
    direction: string;
  }[]>>
}

export interface DataProps {
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
setData: React.Dispatch<React.SetStateAction<{
    id: string;
    type: string;
    name: string;
    price: number;
    currency: string;
    dateOfAction:string;
    dateOfRegister: string;
    dateOfReturn: string;
}[]>>
}

export interface DataToShowProps extends FilterShowProps {
  dataToShow: {
    id: string;
    type: string;
    name: string;
    price: number;
    currency: string;
    dateOfAction: string;
    dateOfRegister: string;
    dateOfReturn: string;
}[],
setDataToShow: React.Dispatch<React.SetStateAction<{
    id: string;
    type: string;
    name: string;
    price: number;
    currency: string;
    dateOfAction: string;
    dateOfRegister: string;
    dateOfReturn: string;
}[]>>
}

export interface DataModalProps extends DataProps {
  visibleModalForm: boolean
  setVisibleModalForm: React.Dispatch<React.SetStateAction<boolean>>
}

export interface CommonProps extends FilterShowProps, DataModalProps {
  setLanguage: React.Dispatch<React.SetStateAction<string>>
}