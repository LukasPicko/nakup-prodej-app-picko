

  export interface FilterShowProps {
    showFilter: boolean;
    setShowFilter: (value: boolean | ((prevVar: boolean) => boolean)) => any;
  }

  export interface FilterValuesProps extends FilterShowProps{
    filterName: string
    setFilterName: React.Dispatch<React.SetStateAction<string>>
    filterType: string
    setFilterType: React.Dispatch<React.SetStateAction<string>>
  }

  export interface DataProps {
    data: {
      id: string;
      type: string;
      name: string;
      price: number;
  }[],
  setData: React.Dispatch<React.SetStateAction<{
      id: string;
      type: string;
      name: string;
      price: number;
  }[]>>
  }

  export interface DataToShowProps extends FilterShowProps {
    dataToShow: {
      id: string;
      type: string;
      name: string;
      price: number;
  }[],
  setDataToShow: React.Dispatch<React.SetStateAction<{
      id: string;
      type: string;
      name: string;
      price: number;
  }[]>>
  }

  export interface DataModalProps extends DataProps {
    setVisibleModalForm: React.Dispatch<React.SetStateAction<boolean>>
  }

  export interface CommonProps extends FilterShowProps, DataProps {}

