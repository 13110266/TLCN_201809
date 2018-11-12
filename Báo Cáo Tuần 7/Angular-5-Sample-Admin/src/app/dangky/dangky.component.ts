import {Component, ElementRef, OnInit, Renderer, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import {Router} from '@angular/router';
import {AuthService} from '../auth/auth.service';
import {User} from '../auth/user.model';

@Component({
  selector: 'app-dangky',
  templateUrl: './dangky.component.html',
  styleUrls: ['./dangky.component.css']
})
export class DangkyComponent implements OnInit {

  myForm: FormGroup;
  username: FormGroup;
  email: FormControl;
  password: FormControl;
  address: FormControl;

  @ViewChild('userEmail') userEmail: ElementRef;

  constructor(private _fb: FormBuilder, private _authService: AuthService,
              private _router: Router, private renderer: Renderer) {
  }

  ngOnInit() {
    if (this._authService.isLoggedIn()) {
      alert('bạn phải thoát tài khoản mới thực hiện thao tào này');
      this._router.navigateByUrl('/');
    }

    this.email = new FormControl('', [Validators.required, this.emailValidator]);
    this.password = new FormControl('', [Validators.required, Validators.minLength(6)]);

    this.myForm = this._fb.group({
      username: this.username,
      email: this.email,
      password: this.password,
      address: this.address
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.renderer.invokeElementMethod(this.userEmail.nativeElement, 'focus', []);
    }, 50);
  }

  // submit the register form to the backend with the user's desired credentials
  onSubmit() {
    const user = new User(this.myForm.value.username, this.myForm.value.email,
      this.myForm.value.password, this.myForm.value.address, '0');
    this._authService.signup(user)
      .subscribe(
        data => {
          // after successfull registration, the user is redirected to the login page
          this._router.navigate(['/login']);
          alert('Đăng ký thành công');
          // toastr message pops up to inform user that the registration was successfull
        },
        error => {
          alert('Email này đã tồn tại');
        }
      );
  }

// input validator to check if the email entered by the user is actually text in an email form
  emailValidator(control) {
    let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

    if (!EMAIL_REGEXP.test(control.value)) {
      return {invalidEmail: true};
    }
  }

}
