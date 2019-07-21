import { Component, OnInit } from '@angular/core';
import { PersonService } from '../../services/contact.service';
import { Person } from '../../model/person';
import { ToastrService } from 'ngx-toastr';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  contacts: Person[];
  faTrashAlt = faTrashAlt;
  constructor(private service: PersonService, private toastr: ToastrService) {}

  ngOnInit() {
    this.service.getContacts().subscribe(actionArray => {
      this.contacts = actionArray.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as Person;
      });
    });
  }
  onEdit(emp: Person): void {
    this.service.formData = Object.assign({}, emp);
  }

  onDelete(id: string): void {
    this.service.deleteContact(id);
    this.toastr.warning('Successfully Deleted Record.');
  }
}
