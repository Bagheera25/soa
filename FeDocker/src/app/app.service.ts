import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from './models/Recipe';

@Injectable()
export class AppService {

    constructor(private http: HttpClient) {}

    getData() {
        return this.http.get('http://localhost:3001/test');
    }
}