import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AuthorizedUser } from './models/AuthorizedUser';
import { User } from './models/user.model';
import { Recipe } from './models/Recipe';

@Injectable()
export class AppService {

    httpOptionsWithToken = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': localStorage.getItem("token")
        })
      };
      httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
        })
      };

    constructor(private http: HttpClient) {}

    getTestData() {
        return this.http.get('http://localhost:3001/test');
    }

    getRecipes() {
        return this.http.get<Recipe[]>('http://localhost:3001/recipes');
    }

    login(user: User) {
        return this.http.post<AuthorizedUser>('http://localhost:4002/api/login', user, this.httpOptions)
    }
}