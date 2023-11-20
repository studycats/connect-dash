import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MSAL_INSTANCE, MsalInterceptor, MsalModule, MsalRedirectComponent } from '@azure/msal-angular';
import { BrowserCacheLocation, InteractionType, PublicClientApplication } from '@azure/msal-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InsightsComponent } from './insights/insights.component';
import { NewWordsComponent } from './new-words/new-words.component';
import { InsightsEffortComponent } from './insights-effort/insights-effort.component';
import { InsightsProgressComponent } from './insights-progress/insights-progress.component';
import { AggregatesChartComponent } from './aggregates-chart/aggregates-chart.component';
import { PlotlyModule } from 'angular-plotly.js';
import { CommonModule } from '@angular/common';
import { CurriculumComponent } from './curriculum/curriculum.component';
import { CurriculumUnitComponent } from './curriculum-unit/curriculum-unit.component';
import { IndexComponent } from './index/index.component';
import { HeaderComponent } from './header/header.component';
import { WordsComponent } from './words/words.component';
import { ResourcesComponent } from './resources/resources.component';

@NgModule({
  declarations: [
    AppComponent,
    InsightsComponent,
    NewWordsComponent,
    InsightsEffortComponent,
    InsightsProgressComponent,
    AggregatesChartComponent,
    CurriculumComponent,
    CurriculumUnitComponent,
    IndexComponent,
    HeaderComponent,
    WordsComponent,
    ResourcesComponent
  ],
  imports: [
    MsalModule.forRoot( new PublicClientApplication({
      auth: {
        knownAuthorities: ['studycatdev.b2clogin.com', 'login.dev.studycat.com', 'login.studycat.com'],
        // clientId: '5fb882ba-6799-46fc-be0e-0d0a98a679d9',
        clientId: '8047db93-ce55-4d03-823e-0fa6882aefc1',
        // authority: 'https://login.dev.studycat.com/43f01f58-80b1-4f51-a1fd-a0bd2c911de5/b2c_1a_signuporsignin_localsocial',
        authority: 'https://login.studycat.com/bb906b88-7e38-4f09-8e8e-a6805c72675a/b2c_1a_signuporsignin_localsocial',
        // authority: 'https://studycatcom.b2clogin.com/tfp/bb906b88-7e38-4f09-8e8e-a6805c72675a/b2c_1a_signuporsignin_localsocial/v2.0/',
        // redirectUri: 'http://localhost:4200'
        redirectUri: 'https://d2az16bxvc4m9n.cloudfront.net',
      },
      cache: {
        cacheLocation: BrowserCacheLocation.LocalStorage,
        storeAuthStateInCookie: false,
      },
      system: {
        loggerOptions: {
          loggerCallback: (logLevel, message, piiEnabled) => { console.log('MSAL:', logLevel, message, piiEnabled) },
          piiLoggingEnabled: false
        }
      }
    }), {
      interactionType: InteractionType.Redirect,
    }, {
      interactionType: InteractionType.Redirect,
      protectedResourceMap: new Map([
        ['https://graph.microsoft.com/v1.0/me', ['user.read']]
      ])
    }),
    BrowserModule,
    AppRoutingModule,
    // PlotlyModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent, MsalRedirectComponent]
})
export class AppModule { }
