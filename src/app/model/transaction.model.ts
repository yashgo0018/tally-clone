import { Product } from './product.model';
import { Contact } from './contact.model';

export class Transaction {
  id?: string;
  name: Contact;
  products: Product[];
  type: string;
  total: number;
  date?: Date;
}
