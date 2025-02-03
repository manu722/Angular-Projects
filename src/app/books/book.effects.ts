import { Injectable } from "@angular/core";

import * as bookActions from './book.actions'
import { BookService } from "./book.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of } from "rxjs";


@Injectable()
export class BookEffects{
// NgRx effect that responds to 'AddBook' action.
    addBook$ = createEffect(() => this.action$.pipe(
    // Listen for actions of type 'AddBook'
        ofType(bookActions.AddBook),

    //For each 'AddBook' action , call 'addBook' on the book service.
    // 'mergeMap' allows multiple concurrent 'addbook' calls. 
        mergeMap((action)=> this.bookService.addBook(action)
    .pipe(

        // If the 'addBook' call is successful,dispatch 'AddBookSuccess' action with the book data.
        map(book=> bookActions.AddBookSuccess(book)),

        // if the 'addBook' fails, disaptch 'AddbookFaiulure' action with the errror.
        catchError((error) => of(bookActions.AddBookFailure({error})))
    )))
);

    constructor(
        private action$: Actions,
        private bookService:BookService,
    ){}
}