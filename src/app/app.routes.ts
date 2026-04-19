import {Routes} from '@angular/router';
import {HomeComponent} from './components/home-component/home-component';
import {AboutComponent} from './components/about-component/about-component';
import {CvComponent} from './components/cv-component/cv-component';
import {ContactComponent} from './components/contact-component/contact-component';
import {ProjectsComponent} from './components/projects-component/projects-component';
import {SettingsComponent} from './components/settings-component/settings-component';
import {ImpressumComponent} from './components/impressum-component/impressum-component';

export const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'projects', component: ProjectsComponent},
  {path: 'about', component: AboutComponent},
  {path: 'cv', component: CvComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'settings', component: SettingsComponent},
  {path: 'impressum', component: ImpressumComponent},
  {path: '**', redirectTo: 'home'},
];
