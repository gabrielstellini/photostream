export type Nullable<T> = T | null;

export interface StateSlice<T> {
  data: T;
  loading: boolean;
  loaded: boolean;
  error: boolean;
}
