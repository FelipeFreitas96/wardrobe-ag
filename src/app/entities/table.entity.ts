export type TableEntity<Items> = {
  headers: string[];
  page: number;
  pageSize: number;
  mapping: {
    [k: string]: null | ((value: string) => string);
  };
  data: {
    items: Items[];
    total: number;
  };
};
