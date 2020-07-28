import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  status:any;
  message:string;
  data:any;
  constructor(private authService: AuthService, private route: Router) { }

  ngOnInit(): void {
  }
  onSignIn(form: NgForm){
    this.authService.signin(form.value.email, form.value.password)
    .subscribe(
      response =>{
        this.message = '';
        this.data = response;
        console.log(this.data);

        localStorage.setItem('token',this.data.token);
        localStorage.setItem('name',this.data.user.name);
        localStorage.setItem('user_id',this.data.user.id);

        this.route.navigate(['/account']);
      },
      error => {
        console.log(error);
        this.status = error.status;
        console.log(this.status);
        if(this.status===401)this.message = 'Неправильний пароль або емейл';
        console.log(this.message);
      }
    )

  }
}
