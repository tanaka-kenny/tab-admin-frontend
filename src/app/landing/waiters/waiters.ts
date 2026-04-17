import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-waiters',
  templateUrl: './waiters.html',
  styleUrl: './waiters.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Waiters {}
