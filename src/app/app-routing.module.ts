import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './guards/admin.guard';
import { NormalUserGuard } from './guards/normal-user.guard';
import { AddCategoryComponent } from './pages/admin/add-category/add-category.component';
import { AddQuizzesComponent } from './pages/admin/add-quizzes/add-quizzes.component';
import { CalibrationCompletionComponent } from './pages/admin/calibration-completion/calibration-completion.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { InstrumentCalibrationComponent } from './pages/admin/instrument-calibration/instrument-calibration.component';
import { InstrumentMasterComponent } from './pages/admin/instrument-master/instrument-master.component';
import { InstrumentTypeMasterDetailsComponent } from './pages/admin/instrument-type-master-details/instrument-type-master-details.component';
import { InstrumentTypeMasterParametersComponent } from './pages/admin/instrument-type-master-parameters/instrument-type-master-parameters.component';
import { InstrumentTypeMasterComponent } from './pages/admin/instrument-type-master/instrument-type-master.component';
import { ReportsComponent } from './pages/admin/reports/reports.component';
import { TraceablityComponent } from './pages/admin/traceablity/traceablity.component';
import { ViewCategoryComponent } from './pages/admin/view-categories/view-category.component';
import { ViewQuizzesComponent } from './pages/admin/view-quizzes/view-quizzes.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SignupComponent } from './pages/signup/signup.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { CompanyComponent } from './pages/admin/company/company.component';
import { CompanyFormComponent } from './pages/admin/company-form/company-form.component';
import { InstrumentCalibrationDetailsComponent } from './pages/admin/instrument-calibration-details/instrument-calibration-details.component';
import { CalibrationAgencyComponent } from './pages/admin/calibration-agency/calibration-agency.component';

const routes: Routes = [

  {
    path:"",
    component:LoginComponent,
    pathMatch:'full'
  },
  {
    path:"signup",
    component:SignupComponent,
    pathMatch:'full'
  },
  {
    path:"login",
    component:LoginComponent,
    pathMatch:'full'
  },
  {
    path:"user-dashboard",
    component:UserDashboardComponent,
    pathMatch:'full',
    canActivate:[NormalUserGuard]
  },
  {
    path:"admin",
    component:DashboardComponent,
    
    canActivate:[AdminGuard],
    children:[
      {
        path:'',
        component:WelcomeComponent
      },
      {
        path:'profile',
        component:ProfileComponent
      },
      {
        path:'categories',
        component:ViewCategoryComponent
      },
      {
        path:'add-category',
        component:AddCategoryComponent
      },
      {
        path:'quizzes',
        component:ViewQuizzesComponent
      },
      {
        path:'add-quiz',
        component:AddQuizzesComponent
      },
      {
        path:'instrument-type-master',
        component:InstrumentTypeMasterComponent
      },
      {
        path:'instrument-type-master-details/:instrumentTypeId',
        component:InstrumentTypeMasterDetailsComponent
      },
      {
        path:'instrument-master',
        component:InstrumentMasterComponent
      },
      {
        path:'instrument-calibration',
        component:InstrumentCalibrationComponent
      },
      {
        path:'calibration-details/:calibrationId',
        component:InstrumentCalibrationDetailsComponent
      },
      {
        path:'calibration-completion',
        component:CalibrationCompletionComponent
      },
      {
        path:'traceablity',
        component:TraceablityComponent
      },
      {
        path:'reports',
        component:ReportsComponent
      },
      {
        path:'company',
        component:CompanyComponent
      },
      {
        path:'company-form',
        component:CompanyFormComponent
      },
      {
        path:'calibration-agency',
        component:CalibrationAgencyComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
