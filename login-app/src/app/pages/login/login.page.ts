import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FireserviceService } from 'src/app/fireservice.service';
import { LoginPageForm } from './login.page.form';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public email:any;
  public password:any;

  form!: FormGroup;
  constructor(private router: Router, private formBuilder: FormBuilder, public fireService: FireserviceService) { }

  ngOnInit() {
    this.form = new LoginPageForm(this.formBuilder).createForm();
  }

  login(){
    this.fireService.loginWithEmail({email:this.email,password:this.password}).then(res=>{
      console.log(res);
      if(res.user?.uid){
        this.fireService.getDetails({uid:res.user.uid}).subscribe(res=>{
          console.log(res);
          //alert('Welcome '+ res['name']);
          this.router.navigate(['home']);
        },err=>{
          console.log(err);
        });
      }
    },err=>{
      alert(err.message)
      console.log(err);
    })
  }

  register(){
    this.router.navigate(['register']);
  }

}
