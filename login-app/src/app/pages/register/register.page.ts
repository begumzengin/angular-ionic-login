import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FireserviceService } from 'src/app/fireservice.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public email:any;
  public password:any;
  public name:any;
  constructor(private router: Router, public fireService:FireserviceService) { }

  ngOnInit() {
  }

  register(){
    this.fireService.signup({email:this.email, password:this.password}).then(res=>{
      if(res.user?.uid){
        let data = {
          email:this.email,
          password:this.password,
          name:this.name,
          uid:res.user.uid
        }
        this.fireService.saveDetails(data).then(res=>{
         alert('Account Created!');
         this.router.navigate(['home']);
        },err=>{
          console.log(err);
        })
      }
    },err=>{
      alert(err.message);

      console.log(err);
    })
  }
}


