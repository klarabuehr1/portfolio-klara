import {Component, inject} from '@angular/core';
import {PageContainerComponent} from '../../../../shared/page-container-component/page-container-component';
import {RevealDirective} from '../../../../shared/reveal-directive/reveal.directive';
import {RouterService} from '../../../services/router.service';

@Component({
  selector: 'app-salt-component',
  imports: [PageContainerComponent, RevealDirective],
  templateUrl: './salt-component.html',
  styleUrl: './salt-component.scss',
})
export class SaltComponent {
  private readonly routerService = inject(RouterService);

  protected navigateToMacroToMicro(): void { this.routerService.navigateToMacroToMicro(); }
  protected navigateToWocy(): void { this.routerService.navigateToWocy(); }
  protected navigateToDryve(): void { this.routerService.navigateToDryve(); }
}
