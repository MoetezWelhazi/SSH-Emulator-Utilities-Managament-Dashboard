import {UserInfo} from "./auth.interface";

export interface Script {
  id?:number;
  args?: number;
  command?: string;
  name: string;
  description: string;
  author?: string;
  createdAt?: Date;
  editable?: any;
  code?:string;
  type?:any;
  update?:any;
  modifier?:string;
  lastModifiedAt?: Date;
  shared?:UserInfo[];

}
