import {AfterViewInit, Component, ElementRef, HostListener, ViewChild} from '@angular/core';
import {PageContainerComponent} from '../../../shared/page-container-component/page-container-component';
import {ButtonComponent} from '../../../shared/button-component/button-component';

@Component({
  selector: 'app-home',
  imports: [PageContainerComponent, ButtonComponent],
  templateUrl: './home-component.html',
  styleUrl: './home-component.scss',
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('projectsHeading') projectsHeading!: ElementRef<HTMLImageElement>;

  ngAfterViewInit() {
    this.updateWidth();
  }

  @HostListener('window:scroll')
  @HostListener('window:resize')
  updateWidth() {
    const el = this.projectsHeading?.nativeElement;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const progress = Math.max(0, Math.min(1, (viewportHeight - rect.top) / (viewportHeight * 0.9)));

    // 100% = full container content width (between paddings), always correct at any screen size
    el.style.width = `${10 + 200 * progress}%`;
  }
}
