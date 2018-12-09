import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import 'materialize-css';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MaterializeModule} from 'angular2-materialize';
import { QuestionnairesComponent } from './questionnaires/questionnaires.component';
import { QuestionnaireComponent } from './questionnaires/questionnaire/questionnaire.component';
import { UsersComponent } from './users/users.component';
import { DictionariesComponent } from './dictionaries/dictionaries.component';
import { LoginComponent } from './login/login.component';
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatInputModule,
  MatProgressSpinnerModule, MatSelectModule,
  MatToolbarModule
} from '@angular/material';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { IndexComponent } from './index/index.component';
import { HeaderComponent } from './main/header/header.component';
import { FooterComponent } from './main/footer/footer.component';
import {UserFormComponent} from './forms/user-form/user-form.component';
import { ProfileComponent } from './dictionaries/profile/profile.component';
import { BranchComponent } from './dictionaries/branch/branch.component';
import { CategoryComponent } from './dictionaries/category/category.component';
import { CropComponent } from './dictionaries/crop/crop.component';
import { ProductComponent } from './dictionaries/product/product.component';

@NgModule({
  declarations: [
    AppComponent,
    QuestionnairesComponent,
    QuestionnaireComponent,
    UsersComponent,
    DictionariesComponent,
    LoginComponent,
    IndexComponent,
    HeaderComponent,
    FooterComponent,
    UserFormComponent,
    ProfileComponent,
    BranchComponent,
    CategoryComponent,
    CropComponent,
    ProductComponent
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
    MatDialogModule,
    MatProgressSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [UserFormComponent]
})
export class AppModule { }
