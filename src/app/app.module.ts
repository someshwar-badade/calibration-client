import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar'; 
import {MatCardModule} from '@angular/material/card'; 
import {MatToolbarModule} from '@angular/material/toolbar'; 
import {MatIconModule} from '@angular/material/icon'; 
import {MatListModule} from '@angular/material/list';
import {MatTableModule} from '@angular/material/table'; 
import {MatSidenavModule} from '@angular/material/sidenav'; 
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { HomeComponent } from './pages/home/home.component'; 
import { authInterceptorProviders } from './services/auth.interceptor';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SidebarComponent } from './pages/admin/sidebar/sidebar.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { ViewCategoryComponent } from './pages/admin/view-categories/view-category.component';
import { AddCategoryComponent } from './pages/admin/add-category/add-category.component';
import { ViewQuizzesComponent } from './pages/admin/view-quizzes/view-quizzes.component';
import { AddQuizzesComponent } from './pages/admin/add-quizzes/add-quizzes.component';
import { InstrumentTypeMasterComponent } from './pages/admin/instrument-type-master/instrument-type-master.component';
import { InstrumentMasterComponent } from './pages/admin/instrument-master/instrument-master.component';
import { InstrumentCalibrationComponent } from './pages/admin/instrument-calibration/instrument-calibration.component';
import { CalibrationCompletionComponent } from './pages/admin/calibration-completion/calibration-completion.component';
import { TraceablityComponent } from './pages/admin/traceablity/traceablity.component';
import { ReportsComponent } from './pages/admin/reports/reports.component';
import { MatSortModule } from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator'; 
import {MatMenuModule} from '@angular/material/menu'; 
import {MatExpansionModule} from '@angular/material/expansion'; 
import { MatTableExporterModule } from 'mat-table-exporter';
import {MatDialogModule} from '@angular/material/dialog';
import {MatProgressBarModule} from '@angular/material/progress-bar'; 
import { InstrumentTypeMasterFormComponent } from './pages/admin/instrument-type-master-form/instrument-type-master-form.component'; 
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select'; 
import {MatAutocompleteModule} from '@angular/material/autocomplete'; 

import { InstrumentMasterFormComponent } from './pages/admin/instrument-master-form/instrument-master-form.component';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { InstrumentMasterDetailsComponent } from './pages/admin/instrument-master-details/instrument-master-details.component';
import { InstrumentTypeMasterDetailsComponent } from './pages/admin/instrument-type-master-details/instrument-type-master-details.component';
import { InstrumentTypeMasterParametersComponent } from './pages/admin/instrument-type-master-parameters/instrument-type-master-parameters.component';
import { InstrumentTypeMasterParameterFormComponent } from './pages/admin/instrument-type-master-parameter-form/instrument-type-master-parameter-form.component';
import { InstrumentCalibrationFormComponent } from './pages/admin/instrument-calibration-form/instrument-calibration-form.component'; 
import { CompanyComponent } from './pages/admin/company/company.component';
import { CompanyFormComponent } from './pages/admin/company-form/company-form.component';
import { InstrumentCalibrationDetailsComponent } from './pages/admin/instrument-calibration-details/instrument-calibration-details.component';
import { InstrumentCalibrationObservationFormComponent } from './pages/admin/instrument-calibration-observation-form/instrument-calibration-observation-form.component';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    DashboardComponent,
    UserDashboardComponent,
    ProfileComponent,
    SidebarComponent,
    WelcomeComponent,
    ViewCategoryComponent,
    AddCategoryComponent,
    ViewQuizzesComponent,
    AddQuizzesComponent,
    InstrumentTypeMasterComponent,
    InstrumentMasterComponent,
    InstrumentCalibrationComponent,
    CalibrationCompletionComponent,
    TraceablityComponent,
    ReportsComponent,
    InstrumentTypeMasterFormComponent,
    InstrumentMasterFormComponent,
    MainNavComponent,
    InstrumentMasterDetailsComponent,
    InstrumentTypeMasterDetailsComponent,
    InstrumentTypeMasterParametersComponent,
    InstrumentTypeMasterParameterFormComponent,
    InstrumentCalibrationFormComponent,
    CompanyComponent,
    CompanyFormComponent,
    InstrumentCalibrationDetailsComponent,
    InstrumentCalibrationObservationFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatSidenavModule,
    MatSortModule,
    MatPaginatorModule,
    MatMenuModule,
    MatExpansionModule,
    MatTableExporterModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    LayoutModule,
    MatProgressBarModule,
    ReactiveFormsModule,
    MatAutocompleteModule

  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
