import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../models/user';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  users = signal<User[]>([]);

  http = inject(HttpClient);

  constructor() {
    const usersUrl = '/assets/users.json'

    this.http.get<User[]>(usersUrl)
    .pipe(takeUntilDestroyed())
    .subscribe(users => this.users.set(users));

  }

  addUser(user: User): User {
    user.id = this.users().length + 1;
    this.users.update(u => [...u, user]);
    return user;
  }

  userById(id: number) {
    return this.users().find(x => x.id == id);
  }

}
