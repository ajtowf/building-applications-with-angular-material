import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivatedRoute, ParamMap } from '@angular/router';

import { NotesComponent } from '../notes/notes.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

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
export class MainContentComponent implements OnInit {

  user: User | null | undefined;
  
  private route = inject(ActivatedRoute);
  private userService = inject(UserService);

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = Number(params.get('id'));
      if (id == 0) id = 1;      
      this.user = null;
      
      this.userService.users.subscribe(users => {
        // Simulate delay to show busy spinner.
        setTimeout(() => {
          this.user = this.userService.userById(id);
        }, 500)
      });

    })
  }

}
