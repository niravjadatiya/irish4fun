import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes} from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ReviewComponent } from './components/review/review.component';
import { StorybookComponent } from './components/storybook/storybook.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FooterComponent } from './components/footer/footer.component';

import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AuthGuard } from './guards/auth.guard';
import { ResultsComponent } from './components/results/results.component';
import { PuzzleService } from './services/puzzle.service';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'review', component: ReviewComponent, canActivate: [AuthGuard]},
  {path: 'results', component: ResultsComponent, canActivate: [AuthGuard]},

  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'storybook', component: StorybookComponent, canActivate: [AuthGuard]}
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ReviewComponent,
    ProfileComponent,
    StorybookComponent,
    FooterComponent,
    ResultsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule.forRoot()
  ],
  providers: [ValidateService, AuthService,PuzzleService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
