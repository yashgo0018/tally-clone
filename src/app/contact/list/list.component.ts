import { Component, OnInit } from '@angular/core';
import { PersonService } from '../../services/contact.service';
import { Person } from '../../model/person';
import { ToastrService } from 'ngx-toastr';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-contact-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  faTrashAlt = faTrashAlt;
  constructor(private service: PersonService, private toastr: ToastrService) {}

  ngOnInit() {}

  onEdit(emp: Person): void {
    this.service.formData = Object.assign({}, emp);
  }

  onDelete(id: string): void {
    this.service.deleteContact(id);
    this.toastr.warning('Successfully Deleted Record.');
  }
}
