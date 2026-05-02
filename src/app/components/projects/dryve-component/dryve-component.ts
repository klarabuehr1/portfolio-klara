import {Component, inject} from '@angular/core';
import {PageContainerComponent} from '../../../../shared/page-container-component/page-container-component';
import {RevealDirective} from '../../../../shared/reveal-directive/reveal.directive';
import {RouterService} from '../../../services/router.service';

@Component({
  selector: 'app-dryve-component',
  imports: [PageContainerComponent, RevealDirective],
  templateUrl: './dryve-component.html',
  styleUrl: './dryve-component.scss',
})
export class DryveComponent {
  private readonly routerService = inject(RouterService);

  protected navigateToMacroToMicro(): void { this.routerService.navigateToMacroToMicro(); }
  protected navigateToWocy(): void { this.routerService.navigateToWocy(); }
  protected navigateToSalt(): void { this.routerService.navigateToSalt(); }
}
