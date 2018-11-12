import {Component, ElementRef, OnInit, Renderer, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastComponent} from '../shared/toast/toast.component';


import {Router} from '@angular/router';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-dangnhap',
  templateUrl: './dangnhap.component.html',
  styleUrls: ['./dangnhap.component.css']
})
export class DangnhapComponent implements OnInit {
  myForm: FormGroup;
  email: FormControl;
  userId: string;
  password: FormControl;
  @ViewChild('userEmail') userEmail: ElementRef;

  constructor(private _fb: FormBuilder, private _authService: AuthService, public toast: ToastComponent,
              private _router: Router, private renderer: Renderer) {
  }

  ngOnInit() {
    this.email = new FormControl('', [Validators.required, this.emailValidator]);
    this.password = new FormControl('', [Validators.required, Validators.minLength(6)]);

    this.myForm = this._fb.group({
      email: this.email,
      password: this.password
    });

    // check if the user is logged in while trying to access the login page, if the user is logged in, we redirect him to the form page
    if (this._authService.isLoggedIn()) {
      alert('bạn phải thoát tài khoản mới thực hiện thao tào này');
      this._router.navigate(['/']);
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.renderer.invokeElementMethod(this.userEmail.nativeElement, 'focus', []);
    }, 50);
  }

  // submit the login form with the user credentials and navigate the user to the index page of our app
  onSubmit() {
    const user = {
      email: this.myForm.value.email,
      password: this.myForm.value.password
    };
    this._authService.signin(user)
      .subscribe(
        data => {
          localStorage.setItem('id_token', data.token);
          localStorage.setItem('userId', data.userId);
          localStorage.setItem('username', data.username);
          localStorage.setItem('role', data.role);
          alert('Đăng nhập thành công');
          location.reload();
          if (data.role == '1') {
            this._router.navigate(['/admin']);
          } else {
            this._router.navigate(['/page']);
          }
        },

        error => {
          alert('Email hoac password sai.');
          console.log(error);
        }
      );
  }

  // input validator to check if the email entered by the user is actually text in an email form
  emailValidator(control) {
    const EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

    if (!EMAIL_REGEXP.test(control.value)) {
      return {invalidEmail: true};
    }
  }
}
