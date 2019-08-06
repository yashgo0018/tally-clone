import { Product } from './product.model';
import { Contact } from './contact.model';
import { Timestamp } from './timestamp.model';

export class Transaction {
  id?: string;
  name: string;
  contact: Contact;
  products: Product[];
  type: string;
  total: number;
  date?: Timestamp;
}
