import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs';
import * as UserActions from '../actions/user.actions';
import { UserAPIService } from '../../services/user-api.service';
import { HttpHeaders } from '@angular/common/http';
import { UserType } from '../../interface/interfaces';
import { Store } from '@ngrx/store';
import { selectUserId, selectuserToken } from '../selectors/auth.selectors';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private userService: UserAPIService,
    private store: Store
  ) {}

  private defaultUser: UserType = {
    _id: '',
    username: '',
    email: '',
    mobile: '',
    image: '',
    date: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  id!: string | null;
  token!: string | null;
  retrieveUserData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.retrieveUserData),
      switchMap(() => {

        this.store.select(selectUserId).subscribe((_id) => {
          this.id = _id;
        });
        this.store.select(selectuserToken).subscribe((token) => {
          this.token = token;
        });
        const headers = new HttpHeaders().set(
          'Authorization',
          `Bearer ${this.token}`
        );

        if (!this.id || !this.token) {
          return of({ type: 'error' });
        }

        return this.userService.getProfile(this.id, headers).pipe(
          map((response) =>
            UserActions.storeUserData({
              userData: response.userData || this.defaultUser,
            })
          ),
          catchError(() => of({ type: 'error' }))
        );
      })
    )
  );
}
