

  export interface FilterProps {
    showFilter?: boolean;
    setShowFilter?: (value: boolean | ((prevVar: boolean) => boolean)) => any;
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

  export interface CommonProps extends FilterProps, DataProps {}

