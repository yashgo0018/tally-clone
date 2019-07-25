import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../model/contact.model';
import { ToastrService } from 'ngx-toastr';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-contact-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  faTrashAlt = faTrashAlt;
  constructor(private service: ContactService, private toastr: ToastrService) {}

  ngOnInit() {}

  onEdit(emp: Contact): void {
    this.service.formData = Object.assign({}, emp);
  }

  onDelete(id: string): void {
    this.service.deleteContact(id);
    this.toastr.warning('Successfully Deleted Record.');
  }
}
