import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.html',
  styleUrl: './billing.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Billing {}
