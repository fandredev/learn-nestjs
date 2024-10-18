export class ResponseMessageDTO {
  id: number;
  text: string;
  read: boolean;
  date: Date;
  createdAt?: Date;
  updatedAt?: Date;
  to: {
    id: number;
    email: string;
    name: string;
  };
  of: {
    id: number;
    email: string;
    name: string;
  };
}
