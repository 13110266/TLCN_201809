import {Component, OnInit} from '@angular/core';
import {Http} from '@angular/http';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';

import {DataService} from '../services/data.service';
import {PagerService} from '../services/pager.service';
import {ToastComponent} from '../shared/toast/toast.component';
import * as _ from 'underscore';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  User = [];
  isLoading = true;

  user = {};
  isEditing = false;

  addUserForm: FormGroup;
  username = new FormControl('', Validators.required);
  password = new FormControl('', Validators.required);
  email = new FormControl('', Validators.required);
  address = new FormControl('', Validators.required);
  role = new FormControl('', Validators.required);
  private allItems: any[];

  // pager object
  pager: any = {};

  // paged items
  pagedItems: any[];

  constructor(private http: Http,
              private dataService: DataService,
              public toast: ToastComponent,
              private formBuilder: FormBuilder, private pagerService: PagerService) {
  }

  ngOnInit() {
    this.getUsers();

    this.addUserForm = this.formBuilder.group({
      username: this.username,
      password: this.password,
      email: this.email,
      address: this.address,
      role: this.role
    });

  }

  getUsers() {
    this.dataService.getUsers().subscribe(
      data => {
        this.allItems = data;
        this.User = data;
        this.setPage(1);
      },
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  addUser() {
    this.dataService.addNew(this.addUserForm.value).subscribe(
      res => {
        const newUser = res.json();
        this.User.push(newUser);
        this.addUserForm.reset();
        this.toast.setMessage('item added successfully.', 'success');
        this.getUsers();
      },
      error => {
        this.toast.setMessage('Error: Email đã tồn tại', 'error');
        console.log(error);
      }
    );
  }

  enableEditing(user) {
    this.isEditing = true;
    this.user = user;
  }

  cancelEditing() {
    this.isEditing = false;
    this.user = {};
    this.toast.setMessage('item editing cancelled.', 'warning');
    // reload the UserRs to reset the editing
    this.getUsers();
  }

  editUser(user) {
    console.log(user);
    this.dataService.editUser(user).subscribe(
      res => {
        this.isEditing = false;
        this.user = user;
        this.toast.setMessage('item edited successfully.', 'success');
        this.getUsers();
      },
      error => console.log(error)
    );
  }

  deleteUser(user) {
    if (window.confirm('Are you sure you want to permanently delete this item?')) {
      this.dataService.deleteUser(user).subscribe(
        res => {
          const pos = this.User.map(elem => {
            return elem._id;
          }).indexOf(user._id);
          this.User.splice(pos, 1);
          this.toast.setMessage('item deleted successfully.', 'success');
          this.getUsers();
        },
        error => console.log(error)
      );
    }
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    // get pager object from service
    this.pager = this.pagerService.getPager(this.allItems.length, page);

    // get current page of items
    this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

}
