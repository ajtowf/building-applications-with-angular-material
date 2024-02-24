import { Injectable, inject, signal } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  users = signal<User[]>([]);

  http = inject(HttpClient);

  addUser(user: User): User {
    user.id = this.users().length + 1;
    this.users.update(u => [...u, user]);
    return user;
  }

  userById(id: number) {
    return this.users().find(x => x.id == id);
  }

  loadAll() {
    const usersUrl = '/assets/users.json'

    return this.http.get<User[]>(usersUrl)
    .subscribe({
      next: data => {  
        this.users.set(data);
      },
      error: error => console.log("Failed to fetch users")
    });
  }

}
