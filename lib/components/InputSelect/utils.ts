export type InputSelectRequestType<Params = any> = {
  search?: string;
  pagination: {
    page: number;
    limit: number;
  };
  parameters?: Params;
};

export type InputSelectResponseType<Item> = Promise<{
  canLoadMore: boolean;
  result: Item[];
}>;

export type InputSelectValueType<Item> = {
  key: string;
  label: string;
  item: Item;
};
