import {Routes} from '@angular/router';
import {HomeComponent} from './components/home-component/home-component';
import {MacroToMicroComponent} from './components/projects/macro-to-micro-component/macro-to-micro-component';
import {WocyComponent} from './components/projects/wocy-component/wocy-component';
import {DryveComponent} from './components/projects/dryve-component/dryve-component';
import {SaltComponent} from './components/projects/salt-component/salt-component';
import {ImpressumComponent} from './components/impressum-component/impressum-component';
import {DatenschutzComponent} from './components/datenschutz-component/datenschutz-component';

export const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'macro-to-micro', component: MacroToMicroComponent},
  {path: 'wocy', component: WocyComponent},
  {path: 'dryve', component: DryveComponent},
  {path: 'salt', component: SaltComponent},
  {path: 'impressum', component: ImpressumComponent},
  {path: 'datenschutz', component: DatenschutzComponent},
  {path: '**', redirectTo: 'home'},
];
