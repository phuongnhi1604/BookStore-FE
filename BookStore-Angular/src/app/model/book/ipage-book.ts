import {IBook} from './ibook';

export interface IPageBook {
  content?: IBook[];
  totalPages?: number;
  totalElements?: number;
  size?: number;
}
