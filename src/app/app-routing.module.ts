import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {IndexComponent} from './index/index.component';
import {QuestionnairesComponent} from './questionnaires/questionnaires.component';
import {QuestionnaireComponent} from './questionnaires/questionnaire/questionnaire.component';
import {UsersComponent} from './users/users.component';
import {DictionariesComponent} from './dictionaries/dictionaries.component';

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'login', component: LoginComponent },
  { path: 'questionnaires', component: QuestionnairesComponent },
  { path: 'questionnaire/{id}', component: QuestionnaireComponent },
  { path: 'users', component: UsersComponent },
  { path: 'dictionaries', component: DictionariesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
