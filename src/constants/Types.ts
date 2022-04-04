export type Id = number | string;
export interface ColumnValue {
  id: Id;
  type: string;
  title: string;
  value: string;
  additional_info: string;
}
export interface Item {
  id: Id;
  name: string;
  columnValues: ColumnValue[];
}
