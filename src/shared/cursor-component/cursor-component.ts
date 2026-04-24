import {Component, HostListener, signal} from '@angular/core';

@Component({
  selector: 'app-cursor',
  standalone: true,
  imports: [],
  templateUrl: './cursor-component.html',
  styleUrl: './cursor-component.scss',
})
export class CursorComponent {
  readonly x = signal(0);
  readonly y = signal(0);
  readonly enlarged = signal(false);

  private static readonly CLICKABLE_SELECTOR =
    'a, button, [role="button"], input, textarea, select, label, [tabindex]';

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    this.x.set(event.clientX);
    this.y.set(event.clientY);

    const target = event.target as Element | null;
    this.enlarged.set(!!target?.closest(CursorComponent.CLICKABLE_SELECTOR));
  }
}
