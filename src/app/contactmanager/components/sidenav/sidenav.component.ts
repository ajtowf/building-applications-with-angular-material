import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';

import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Direction } from '@angular/cdk/bidi';

import { ToolbarComponent } from '../toolbar/toolbar.component';

import { UserService } from '../../services/user.service';

const SMALL_WIDTH_BREAKPOINT = 720;

@Component({
    selector: 'app-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.scss'],
    standalone: true,
    imports: [
      CommonModule, 
      MatSidenavModule, 
      MatToolbarModule, 
      MatListModule, 
      RouterLink, 
      MatIconModule, 
      ToolbarComponent, 
      RouterOutlet
    ]
})
export class SidenavComponent implements OnInit {

  protected isScreenSmall: boolean = false;
  protected userService = inject(UserService);

  protected isDarkTheme: boolean = false;
  protected dir: Direction = 'ltr';

  private breakpointObserver = inject(BreakpointObserver);
  private router = inject(Router);

  @ViewChild(MatSidenav) sidenav!: MatSidenav;

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
  }

  toggleDir() {
    this.dir = this.dir == 'ltr' ? 'rtl' : 'ltr';
  }

  ngOnInit(): void {
    this.breakpointObserver
      .observe([`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`])
      .subscribe((state: BreakpointState) => {
        this.isScreenSmall = state.matches;
      });

    this.router.events.subscribe(() => {
      if (this.isScreenSmall) {
        this.sidenav.close();
      }
    });
  }

}
