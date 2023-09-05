import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs';
import * as UserActions from '../actions/user.actions';
import { UserAPIService } from '../../services/user-api.service';
import { HttpHeaders } from '@angular/common/http';
import { UserType } from '../../interface/interfaces';


@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private userService: UserAPIService) {
    this.id = localStorage.getItem('_id');
    const authToken: string | null = localStorage.getItem('userToken');
    this.headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${authToken}`
    );
  }
  id: string | null;
  headers: HttpHeaders;

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

  retrieveUserData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.retrieveUserData),
      switchMap(() =>
        this.id
          ? this.userService.getProfile(this.id, this.headers).pipe(
              map((response) =>
                UserActions.storeUserData({
                  userData: response.userData || this.defaultUser,
                })
              ),
              catchError(() => of({ type: 'error' }))
            )
          : of({ type: 'error' })
      )
    )
  );
}
