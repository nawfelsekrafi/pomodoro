import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// this module is for captcha
import { NgxCaptchaModule } from 'ngx-captcha';

// this modules are for Google Fire Base 
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';

// these are the components
import { AppComponent } from './app.component';
import { StartComponent } from './Home/start.component';
import { LandingPageCopmonent } from './layout/landing-page/landing-page.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { HeaderComponent } from './layout/header/header.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { CreateAccountComponent } from './auth/sign-up-email/create-account.component';
import { SignInEmailComponent } from './auth/sign-in-email/sign-in-email.component';

//
import { environment } from '../environments/environment.prod';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { AppPomodoroComponent } from './app-pomodoro/app-pomodoro.component';
import { NavComponent } from './layout/nav/nav.component';
import { TimerComponent } from './menu/timer/timer.component';
import { DashboardComponent } from './menu/dashboard/dashboard.component';
import { SettingComponent } from './menu/setting/setting.component';
import { ProjectsComponent } from './menu/projects/projects.component';
import { AboutComponent } from './menu/about/about.component';
import { ModalComponent } from './layout/modal/modal.component';



@NgModule({
  declarations: [AppComponent, StartComponent, LandingPageCopmonent, SignInComponent, HeaderComponent, SignUpComponent, CreateAccountComponent, SignInEmailComponent, ForgotPasswordComponent, AppPomodoroComponent, NavComponent, TimerComponent, DashboardComponent, SettingComponent, ProjectsComponent, AboutComponent, ModalComponent],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    FormsModule,
    NgxCaptchaModule,
    AppRoutingModule
  ], 
  providers: [ ],
  bootstrap: [AppComponent],
})
export class AppModule {}
