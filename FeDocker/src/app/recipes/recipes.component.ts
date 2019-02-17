import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

import { Recipe } from '../models/Recipe'

@Component({
    selector: 'app-recipes',
    templateUrl: './recipes.component.html',
    styleUrls: ['./recipes.component.css']
})

export class RecipesComponent implements OnInit {

    recipes: Recipe[];
    constructor(private dataService: AppService) { }


    ngOnInit() {
        this.getData();
    }

    getData() {
        this.dataService.getRecipes().subscribe(data => {
            this.recipes = data;
        })
    }
}
