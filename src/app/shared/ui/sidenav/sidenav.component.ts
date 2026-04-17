import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { faBank, faBuilding, faCalendar, faChartBar, faCreditCard, faDashboard, faPeopleGroup, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from "@fortawesome/angular-fontawesome";

@Component({
  selector: 'app-sidenav',
  imports: [RouterLink, RouterLinkActive, FaIconComponent],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent {
  navItems = navItems
}

const navItems: {
  icon: IconDefinition;
  path: string;
  name: string
}[] = [
    {
      icon: faChartBar,
      name: 'Dashboard',
      path: 'dashboard'
    },
    {
      icon: faCalendar,
      name: 'Events',
      path: 'events'
    },
    {
      icon: faCreditCard,
      name: 'Billing',
      path: 'billing'
    },
    {
      icon: faPeopleGroup,
      name: 'Waiters',
      path: 'waiters'
    },
    {
      icon: faBuilding,
      name: 'Tenants',
      path: 'tenants'
    }
  ]
