import {Recipe} from "./recipe.model";
import {Ingredient} from "../shared/ingredient.model";
import { Injectable} from "@angular/core";
import {ShoppingListService} from "../shopping-list/shopping-list.service";
import {Subject} from "rxjs";

@Injectable()
export class RecipeService{
  recipesChanged = new Subject<Recipe[]>();

  // private recipes: Recipe[] = [
  //   new Recipe('Macarrones aesteril',
  //     'Macarones bonitos para comer',
  //     'https://cdn6.recetasdeescandalo.com/wp-content/uploads/2020/05/Macarrones-con-tomate-casero.-Receta-muy-sabrosa-y-sencilla-1.jpg',
  //     [
  //       new Ingredient('macarrones', 2),
  //       new Ingredient('salsa de tomate', 5),
  //       new Ingredient('latas de atun', 2)
  //     ]),
  //
  //   new Recipe('MF Doom Mac n Cheese',
  //     'MF Doom´s famouse Mac n Cheese',
  //     'https://arthurmagdotcom.files.wordpress.com/2009/09/villainous-mac-cheeze-1.jpg',
  //     [
  //       new Ingredient('Maccaroni', 2),
  //       new Ingredient('cheese', 3),
  //       new Ingredient('breadcrumbs', 3)
  //     ])
  // ];

  private recipes: Recipe[] = [];

  constructor(private slService: ShoppingListService) {
  }

  setRecipes(recipes: Recipe[]){
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes(){
    return this.recipes.slice();
  }

  getRecipe(index: number){
    return this.recipes[index];
  }
  addToShoppingList(ingredients: Ingredient[]){
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe){
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }
  updateRecipe(index: number, newRecipe: Recipe){
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number){
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
