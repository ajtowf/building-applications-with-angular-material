import { Routes } from "@angular/router";

import { ContactmanagerComponent } from "./contactmanager.component";
import { MainContentComponent } from "./components/main-content/main-content.component";

export const CONTACTMANAGER_ROUTES: Routes = [
    {
      path: '', component: ContactmanagerComponent,
      children: [
        { path: ':id', component: MainContentComponent },
        { path: '', component: MainContentComponent }
      ]
    }
  ];