import { Router } from '@angular/router';
import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { take, tap } from 'rxjs/operators';

import { User } from './../interfaces/user.model';
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthService implements OnDestroy {

  subscribe$!: Subscription;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnDestroy(): void {
    this.subscribe$.unsubscribe();
  }

  check(): boolean {
    return localStorage.getItem('user') ? true : false;
  }

  login(credentials: { email: string, password: string, device_name: string }): Observable<boolean> {
    return this.http.post<any>(`${environment.base}/auth/login`, credentials).pipe(
      tap(data => {
        localStorage.setItem('token', data.token);
          this.setUser();
      }),
      take(1));
  }

  password(credentials: { email: string }): Observable<any> {
    return this.http.post<any>(`${environment.base}/password/email`, credentials).pipe(take(1));
  }

  passwordReset(credentials: { token: string, email: string, password: string, password_confirmation: string }): Observable<any> {
    return this.http.post<any>(`${environment.base}/password/reset`, credentials).pipe(take(1));
  }

  logout(): void {
     this.subscribe$ = this.http.get(`${environment.base}/auth/logout`).subscribe(() => {
      localStorage.clear();
      this.router.navigate(['/login']);
    });
  }

  getUser(): User {
    return localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
  }

  getApiUser() {
    return this.http.get<any>(`${environment.base}/auth/me`)
      .pipe(take(1));
  }

  async setUser(): Promise<boolean> {
    this.getApiUser().subscribe(
      {
        next: data => {
         localStorage.setItem('user', JSON.stringify(data.user));
          setTimeout(() => {
            this.redirect();
          }, 100);
          return true;
        }
      }
    );
    return false;
  }

  verificaSenha(data): Observable<User> {
    const value = { senha: data };
    return this.http.post<User>(`${environment.base}/usuarios/verifica-senha`, value)
      .pipe(take(1));
  }

  salvarSenha(data): Observable<User> {
    return this.http.post<User>(`${environment.base}/usuarios/nova-senha`, data)
      .pipe(take(1));
  }

  verUser(id): Observable<User[]> {
    return this.http.get<User[]>(`${environment.base}/usuarios/${id}`)
      .pipe(take(1));
  }

  verificaEmail(data): Observable<any> {
    return this.http.post(`${environment.base}/verifica-email`, data)
      .pipe(take(1));
  }

  salvarUsuario(data): Observable<User> {
    return this.http.post<User>(`${environment.base}/usuarios`, data)
      .pipe(take(1));
  }

  deleteUser(id): Observable<User[]> {
    return this.http.delete<User[]>(`${environment.base}/usuarios/${id}`)
      .pipe(take(1));
  }

  listaUsuarios(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.base}/usuarios`)
      .pipe(take(1));
  }

  redirect() {
    if (localStorage.getItem('user')) {
      this.http.get<any>(`${environment.base}/auth/me`).subscribe(data => {
        if (data.user.perm === 'adm') {
          this.router.navigate(['/painel']);
        } else {
          this.router.navigate(['/']);
        }
      });
    } else {
      this.router.navigate(['/login']);
    }
  }

}
