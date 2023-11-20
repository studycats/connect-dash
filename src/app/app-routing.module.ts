import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { InsightsComponent } from './insights/insights.component';
import { IndexComponent } from './index/index.component';
import { CurriculumComponent } from './curriculum/curriculum.component';
import { HeaderComponent } from './header/header.component';
import { WordsComponent } from './words/words.component';
import { CurriculumUnitComponent } from './curriculum-unit/curriculum-unit.component';
import { ResourcesComponent } from './resources/resources.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'insights'
  },
  //  {
  //    path: 'insights',
  //    component: InsightsComponent,
  //    canActivate: [
  //      MsalGuard
  //    ]
  //  },
  {
    path: 'insights',
    component: IndexComponent,
    canActivate: [
      MsalGuard
    ],
    children: [
      {
        path: '',
        component: HeaderComponent,
        data: { selectedTab: "insights" },
        outlet: "header"
      },
      {
        path: '',
        component: InsightsComponent,
        outlet: "content"
      },
    ]
  },
  {
    path: 'curriculum',
    component: IndexComponent,
    canActivate: [
    ],
    children: [
      {
        path: '',
        component: HeaderComponent,
        data: { selectedTab: "curriculum" },
        outlet: "header"
      },
      {
        path: '',
        component: CurriculumComponent,
        outlet: "content"
      },
      {
        path: ':unitName',
        component: CurriculumUnitComponent,
        outlet: "content"
      },
    ]
  },
  {
    path: 'words',
    component: IndexComponent,
    canActivate: [
    ],
    children: [
      {
        path: '',
        component: HeaderComponent,
        data: { selectedTab: "words" },
        outlet: "header"
      },
      {
        path: '',
        component: WordsComponent,
        outlet: "content"
      }
    ]
  },
//  {
//    path: 'curriculum/:unitName',
//    component: IndexComponent,
//    canActivate: [
//    ],
//    children: [
//      {
//        path: '',
//        component: HeaderComponent,
//        data: { selectedTab: "curriculum" },
//        outlet: "header"
//      },
//      {
//        path: '',
//        component: CurriculumUnitComponent,
//        outlet: "content"
//      },
//    ]
//  },
  {
    path: 'resources',
    component: IndexComponent,
    canActivate: [
    ],
    children: [
      {
        path: '',
        component: HeaderComponent,
        data: { selectedTab: "resources" },
        outlet: "header"
      },
      {
        path: '',
        component: ResourcesComponent,
        outlet: "content"
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
