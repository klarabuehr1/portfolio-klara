import {Component, inject} from '@angular/core';
import {PageContainerComponent} from '../../../../shared/page-container-component/page-container-component';
import {RevealDirective} from '../../../../shared/reveal-directive/reveal.directive';
import {RouterService} from '../../../services/router.service';

@Component({
  selector: 'app-wocy-component',
  imports: [PageContainerComponent, RevealDirective],
  templateUrl: './wocy-component.html',
  styleUrl: './wocy-component.scss',
})
export class WocyComponent {
  private readonly routerService = inject(RouterService);

  protected navigateToMacroToMicro(): void { this.routerService.navigateToMacroToMicro(); }
  protected navigateToDryve(): void { this.routerService.navigateToDryve(); }
  protected navigateToSalt(): void { this.routerService.navigateToSalt(); }
}
