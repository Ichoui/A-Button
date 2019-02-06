export interface  User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  conName?: string;
  number?:number;
  day?: number;
  month?: number;
  year?: number;
}

export interface Con {
  conName
}
