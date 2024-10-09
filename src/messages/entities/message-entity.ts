export class MessageEntity {
  // Poderia ser uma interface também
  id: number;
  text: string;
  of: string;
  to: string;
  read: boolean;
  date: Date;
}
