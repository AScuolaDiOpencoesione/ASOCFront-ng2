import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DRFNewComponent } from './objectcomponents/new.component';
import { DRFEditComponent } from './objectcomponents/edit.component';
import { DRFListComponent } from './objectcomponents/list.component';
import { DRFDetailComponent } from './objectcomponents/detail.component';

import { ThanksComponent } from './thanks/thanks.component';

import { MnLoginComponent } from './mn-login/mn-login.component';
import { MnRegisterComponent } from './mn-register/mn-register.component';
import { MnLogoutComponent } from './mn-logout/mn-logout.component';
import { MnRecoverComponent } from './mn-recover/mn-recover.component';
import { MnActivateComponent } from './mn-activate/mn-activate.component';
import { MnResetComponent } from './mn-reset/mn-reset.component';
import { AsocReportThanksComponent } from './asoc-report-thanks/asoc-report-thanks.component';

import { PageHomeComponent } from './page-home/page-home.component';
import { PageProfilesComponent } from './page-profiles/page-profiles.component';

import { MetaformComponent } from './metaform/metaform.component';
import { MnAuthGuardService } from './mn-authguard.service';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '',                             component: PageHomeComponent },

      { path: 'signup',                       component: MnRegisterComponent },
      { path: 'login',                        component: MnLoginComponent },
      { path: 'logout',                       component: MnLogoutComponent },
      { path: 'pwreset',                      component: MnResetComponent },
      { path: 'recover/:uid/:token',          component: MnRecoverComponent },
      { path: 'activate/:uid/:token',         component: MnActivateComponent },
      { path: 'confirm/:uid/:token',          component: MnActivateComponent },
      //
      //{ path: 'profile', component: OwnProfileComponent, canActivate: [MnAuthGuardService] },
      //
      { path: 'profile/create',               component: PageProfilesComponent,     canActivate: [MnAuthGuardService] },
      //    
      { path: 'profile/create/teacher',       component: DRFNewComponent,           canActivate: [MnAuthGuardService], data:{ dataspace:"", next:"/", operation:"Aggiunta", name:"Docente",      datasource:"profile/teacher" }},
      { path: 'profile/create/edic',          component: DRFNewComponent,           canActivate: [MnAuthGuardService], data:{ dataspace:"", next:"/", operation:"Aggiunta", name:"EDIC",         datasource:"profile/edic" }},
      { path: 'profile/create/association',   component: DRFNewComponent,           canActivate: [MnAuthGuardService], data:{ dataspace:"", next:"/", operation:"Aggiunta", name:"Associazione", datasource:"profile/association" }},
      { path: 'profile/create/team',          component: DRFNewComponent,           canActivate: [MnAuthGuardService], data:{ dataspace:"", next:"/", operation:"Aggiunta", name:"Team",         datasource:"teamdetails" }},
          
      { path: 'profile/edit/teacher/:id',     component: DRFEditComponent,          canActivate: [MnAuthGuardService], data:{ dataspace:"", next:"/", operation:"Modifica", name:"Docente",      datasource:"profile/teacher" }},
      { path: 'profile/edit/edic/:id',        component: DRFEditComponent,          canActivate: [MnAuthGuardService], data:{ dataspace:"", next:"/", operation:"Modifica", name:"EDIC",         datasource:"profile/edic" }},
      { path: 'profile/edit/association/:id', component: DRFEditComponent,          canActivate: [MnAuthGuardService], data:{ dataspace:"", next:"/", operation:"Modifica", name:"Associazione", datasource:"profile/association" }},
      { path: 'profile/edit/team/:id',        component: DRFEditComponent,          canActivate: [MnAuthGuardService], data:{ dataspace:"", next:"/", operation:"Modifica", name:"Team",         datasource:"teamdetails" }},
    
      { path: 'profile/thanks',               component: ThanksComponent,           canActivate: [MnAuthGuardService] },
    
      { path: 'report/:id/new',               component: MetaformComponent,         canActivate: [MnAuthGuardService] },
      { path: 'report/:id/edit/:iid',         component: MetaformComponent,         canActivate: [MnAuthGuardService] },
      { path: 'report/thanks',                component: AsocReportThanksComponent, canActivate: [MnAuthGuardService] },

      { path: 'activate/:uid/:token',         component: MnActivateComponent },
      { path: 'confirm/:uid/:token',          component: MnActivateComponent },
    ])
  ],
  exports: [
    RouterModule
  ],
  providers: [
    
  ]
})
export class AppRoutingModule { }
