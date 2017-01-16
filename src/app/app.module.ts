import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { AuthHttp, AUTH_PROVIDERS } from 'angular2-jwt';

import { Routes, Router, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { PageHomeComponent } from './page-home/page-home.component';
import { MnSidebarComponent } from './mn-sidebar/mn-sidebar.component';
import { MnTopbarComponent } from './mn-topbar/mn-topbar.component';

import { MaterialModule } from '@angular/material';

import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { MnAuthService, mnAuthFactory } from './mn-auth.service';
import { MnSocialService, mnSocialFactory } from './mn-social.service';
import { MnProfileService, mnProfileFactory } from './mn-profile.service';
import { BackendManagerService, bmsFactory } from './backend-manager.service';
import { MnUploadService, mnUploadFactory } from './mn-upload.service';
import { MnAuthGuardService } from './mn-authguard.service';

import { ThanksComponent } from './thanks/thanks.component';

import { AppRoutingModule } from './app-routing.module';

import { MnRegisterComponent } from './mn-register/mn-register.component';
import { MnLoginComponent } from './mn-login/mn-login.component';
import { MnLogoutComponent } from './mn-logout/mn-logout.component';
import { MnResetComponent } from './mn-reset/mn-reset.component';
import { MnActivateComponent } from './mn-activate/mn-activate.component';

import { MetaformComponent } from './metaform/metaform.component';

import { MnUploadComponent } from './mn-upload/mn-upload.component';
import { PageProfilesComponent } from './page-profiles/page-profiles.component';

import { DRFEditComponent } from './objectcomponents/edit.component';
import { DRFNewComponent } from './objectcomponents/new.component';
import { MnCkeditComponent } from './mn-ckedit/mn-ckedit.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { MnRecoverComponent } from './mn-recover/mn-recover.component';
import { AsocReportThanksComponent } from './asoc-report-thanks/asoc-report-thanks.component';
import { MnOembedComponent } from './mn-oembed/mn-oembed.component';

let mode = "test";
//let mode = "";

@NgModule({
  declarations: [
    AppComponent,
    PageHomeComponent,
    MnSidebarComponent,
    MnTopbarComponent,
    ThanksComponent,
    MnRegisterComponent,
    MnLoginComponent,
    MnLogoutComponent,
    MnResetComponent,
    MnActivateComponent,
    MnUploadComponent,
    PageProfilesComponent,
    DRFEditComponent,
    DRFNewComponent,
    MetaformComponent,
    MnCkeditComponent,
    MnRecoverComponent,
    AsocReportThanksComponent,
    MnOembedComponent
  ],
  imports: [
    MaterialModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    CKEditorModule,
  ],
  providers: [
    AUTH_PROVIDERS,
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    {provide: MnAuthService, useFactory: mnAuthFactory("http://"+mode+"api.ascuoladiopencoesione.it/api-token-auth/"), deps:[Http]},
    //{provide: MnSocialService, useFactory: mnSocialFactory("http://"+mode+"api.ascuoladiopencoesione.it/login/social/jwt/"), deps:[Http]},
    {provide: MnProfileService, useFactory: mnProfileFactory("http://"+mode+"api.ascuoladiopencoesione.it/auth/"), deps:[AuthHttp, Http, MnAuthService]},
    {provide: MnUploadService, useFactory: mnUploadFactory("http://"+mode+"api.ascuoladiopencoesione.it/preauth/"), deps:[Http]},
    {provide: BackendManagerService, useFactory: bmsFactory("http://"+mode+"api.ascuoladiopencoesione.it/"), deps:[AuthHttp]},
    MnAuthGuardService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
