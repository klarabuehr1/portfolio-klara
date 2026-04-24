import {Routes} from '@angular/router';
import {HomeComponent} from './components/home-component/home-component';
import {AboutComponent} from './components/about-component/about-component';
import {CvComponent} from './components/cv-component/cv-component';
import {ContactComponent} from './components/contact-component/contact-component';
import {ProjectsComponent} from './components/projects-component/projects-component';
import {MacroToMicroComponent} from './components/projects/macro-to-micro-component/macro-to-micro-component';
import {WocyComponent} from './components/projects/wocy-component/wocy-component';
import {DryveComponent} from './components/projects/dryve-component/dryve-component';
import {SaltComponent} from './components/projects/salt-component/salt-component';
import {SettingsComponent} from './components/settings-component/settings-component';
import {ImpressumComponent} from './components/impressum-component/impressum-component';
import {DatenschutzComponent} from './components/datenschutz-component/datenschutz-component';

export const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'projects', component: ProjectsComponent},
  {path: 'macro-to-micro', component: MacroToMicroComponent},
  {path: 'wocy', component: WocyComponent},
  {path: 'dryve', component: DryveComponent},
  {path: 'salt', component: SaltComponent},
  {path: 'about', component: AboutComponent},
  {path: 'cv', component: CvComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'settings', component: SettingsComponent},
  {path: 'impressum', component: ImpressumComponent},
  {path: 'datenschutz', component: DatenschutzComponent},
  {path: '**', redirectTo: 'home'},
];
