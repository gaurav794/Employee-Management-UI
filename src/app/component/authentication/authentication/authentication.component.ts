import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/service/authentication/authentication-service';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { Token } from '@angular/compiler';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css'],
})
export class AuthenticationComponent implements OnInit {
  public isUserLoggedIn: boolean | undefined;
  public progress_bar_type: string = 'warning';
  public progress_bar_value: number = 75;

  constructor(
    private authenticationService: AuthenticationService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.getAuthorizationCode();
  }

  ngOnInit(): void {
    this.isUserLoggedIn = false;

    this.authenticationService
      .getToken()
      .pipe(take(1))
      .subscribe((tokens) => {
        if ((tokens as any)?.id_token) {
          sessionStorage.setItem('id_token', (tokens as any).id_token);
          sessionStorage.setItem(
            'refresh_token',
            (tokens as any).refresh_token
          );

          //Data Update
          this.isUserLoggedIn = true;
          this.progress_bar_type = 'success';
          this.progress_bar_value = 100;

          setTimeout(() => {
            //redirect to dashboard after 2 seconds
            this.router.navigate(['']);
          }, 1000);
        } else {
          console.error('Forbidden');
        }
      });
  }

  getAuthorizationCode() {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params?.['code']) {
        let code: string = params['code'];
        console.log(code);
        this.authenticationService.setCode(code);
      }
    });
  }
}
