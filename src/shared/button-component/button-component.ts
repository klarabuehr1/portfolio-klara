import {Component, output} from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  templateUrl: './button-component.html',
  styleUrl: './button-component.scss',
})
export class ButtonComponent {
  readonly label = 'View more';
  readonly pressed = output<void>();

  onButtonClick(): void {
    this.pressed.emit();
  }
}
