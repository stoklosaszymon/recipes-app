import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLinkActive, RouterLink, MatIconModule ],
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent {
  isMobileMenuOpen = false;
  navitems = [
    { tab: 'Recipes', route: '/recipes' },
  ]

  router = inject(Router);

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  goToAdd() {
    this.router.navigate(['/new']);
  }

}