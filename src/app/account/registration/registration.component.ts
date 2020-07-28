import { Component, OnInit } from '@angular/core';
import { Register } from './register.model';
import { AuthService } from 'src/app/services/auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  register = new Register();
  data: any;
  constructor(
    private authservice: AuthService,
    private route: Router
  ) { }

  ngOnInit(): void {
  }
  onSignUp(form: NgForm){
    this.authservice.signup(form.value.username,form.value.email,form.value.password)
      .subscribe(
        response => {
          console.log(response);
          this.route.navigate(['/account']);
          this.authservice.signin(form.value.email, form.value.password)
            .subscribe(
              response =>{
                this.data = response;
                localStorage.setItem('token',this.data.token);
                localStorage.setItem('name',this.data.user.name);
                localStorage.setItem('user_id',this.data.user.id);

              },
              error => {
                console.log(error);
              }
          );
        },
        error => console.log(error),
      )
  }
}
