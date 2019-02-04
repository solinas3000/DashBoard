import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../global-service/auth.service';
import { TokenService } from '../../../global-service/token.service';
  /**
   *
   * Login Component / Use all services related to this function / See constructor
   *
   *
   */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private tokenService: TokenService) { }
  showSpinner: boolean;
  username: string;
  password: string;

  login(): void {
    this.authService.attemptAuth(this.username, this.password)
  }


  ngOnInit() {
    this.tokenService.signOut()
  }

}
