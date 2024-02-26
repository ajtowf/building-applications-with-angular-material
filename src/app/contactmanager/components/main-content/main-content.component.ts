import { Component, Input, OnChanges, OnInit, Signal, SimpleChanges, computed, inject, input, numberAttribute, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivatedRoute, ParamMap } from '@angular/router';

import { NotesComponent } from '../notes/notes.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { delay, of } from 'rxjs';

@Component({
    selector: 'app-main-content',
    templateUrl: './main-content.component.html',
    styleUrls: ['./main-content.component.scss'],
    standalone: true,
    imports: [
      CommonModule, 
      MatProgressSpinnerModule, 
      MatCardModule, 
      MatIconModule, 
      MatTabsModule, 
      NotesComponent
    ]
})
export class MainContentComponent implements OnChanges {
  @Input({transform: numberAttribute}) id = 0;

  protected user: User | null | undefined;
  
  private userService = inject(UserService);
  private users$ = toObservable(this.userService.users).pipe(delay(500));
  
  ngOnChanges(changes: SimpleChanges) {
    let userId = 1;
    if (this.id) userId = this.id;

    this.user = null;
    this.users$.subscribe(x => this.user = this.userService.userById(userId));
  }

}
