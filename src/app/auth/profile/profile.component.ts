import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Usuario } from '../../shared/model/usuario.model';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: Usuario;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<Usuario>(`${environment.base}/auth/me`).subscribe(data => {
      this.user = data.user;
    });
  }

}
