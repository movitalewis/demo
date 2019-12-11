import { Component, OnInit, Input } from '@angular/core';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Input() loginData = { email:'sharad.tikadia@interactiveavenues.com', password: 'sharad@123' };
  
  constructor(public rest:RestService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    // this.login();
  }
  login() {
    //this.login = [];
    this.rest.login(this.loginData).subscribe((result) => {
      this.loginData = result;
      console.log(result, 'result');
    });
  }


  // addProduct() {
  //   this.rest.addProduct(this.productData).subscribe((result) => {
  //     this.router.navigate(['/product-details/'+result._id]);
  //   }, (err) => {
  //     console.log(err);
  //   });
  // }

}
