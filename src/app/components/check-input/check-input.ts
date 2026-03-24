import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-check-input',
  imports: [MatIconModule],
  templateUrl: './check-input.html',
  styleUrl: './check-input.scss',
})
export class CheckInput {
  @Input()
  text: string = '';

  @Input()
  checked: boolean = false;
  
}
