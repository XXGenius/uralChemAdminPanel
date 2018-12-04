import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import 'materialize-css';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MaterializeModule} from 'angular2-materialize';
import { QuestionnairesComponent } from './questionnaires/questionnaires.component';
import { QuestionnaireComponent } from './questionnaire/questionnaire.component';
import { UsersComponent } from './users/users.component';
import { DictionariesComponent } from './dictionaries/dictionaries.component';
import { LoginComponent } from './login/login.component';
import {MatButtonModule, MatCardModule, MatInputModule, MatProgressSpinnerModule, MatToolbarModule} from '@angular/material';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    QuestionnairesComponent,
    QuestionnaireComponent,
    UsersComponent,
    DictionariesComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterializeModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MatInputModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
