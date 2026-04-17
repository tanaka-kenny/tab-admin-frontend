import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidenavComponent } from '../shared/ui/sidenav/sidenav.component';

@Component({
  selector: 'app-landing',
  imports: [RouterOutlet, SidenavComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingComponent {}
