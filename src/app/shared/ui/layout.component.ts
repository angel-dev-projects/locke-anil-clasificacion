import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AuthStateService } from '../data-access/auth-state.service';

@Component({
  standalone: true,
  imports: [RouterModule, RouterLink],
  selector: 'app-layout',
  template: `
    <header class="bg-white dark:bg-gray-900 shadow-md mb-5">
      <div
        class="mx-auto max-w-screen-lg px-4 flex items-center justify-between h-[80px]"
      >
        <!-- Logo -->
        <a
          class="flex items-center text-2xl font-semibold text-gray-900 dark:text-white"
          routerLink="/home/standings"
        >
          <img class="w-10 h-10 mr-2" src="images/pokeball.png" alt="Logo" />
          Locke Añil
        </a>

        <!-- Menu button -->
        <button
          (click)="toggleMenu()"
          class="md:hidden text-gray-700 dark:text-gray-300 focus:outline-none"
        >
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        <!-- Navegation -->
        <nav
          class="hidden md:flex gap-6 text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          <a
            routerLink="/home/standings"
            routerLinkActive="font-bold text-green-600 dark:text-green-400"
            class="hover:text-green-600 dark:hover:text-green-400"
            >Clasificación</a
          >
          <a
            routerLink="/home/matches"
            routerLinkActive="font-bold text-green-600 dark:text-green-400"
            class="hover:text-green-600 dark:hover:text-green-400"
            >Combates</a
          >
        </nav>

        <!-- Logout -->
        <button
          type="button"
          (click)="logOut()"
          class="hidden md:inline-flex items-center justify-center text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-3 py-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          title="Cerrar sesión"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1"
            />
          </svg>
        </button>
      </div>

      <!-- Mobile menu -->
      @if (menuOpen) {
      <div class="md:hidden px-4 pb-4">
        <nav
          class="flex flex-col gap-2 text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          <a
            routerLink="/home/standings"
            routerLinkActive="font-bold text-green-600 dark:text-green-400"
            class="hover:text-green-600 dark:hover:text-green-400"
            >Clasificación</a
          >
          <a
            routerLink="/home/matches"
            routerLinkActive="font-bold text-green-600 dark:text-green-400"
            class="hover:text-green-600 dark:hover:text-green-400"
            >Combates</a
          >
          <button
            (click)="logOut()"
            class="text-left text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
          >
            Cerrar sesión
          </button>
        </nav>
      </div>
      }
    </header>

    <router-outlet />
  `,
})
export default class LayoutCompoent {
  private _authState = inject(AuthStateService);
  private _router = inject(Router);

  menuOpen = false;

  // Method to toggle the mobile menu visibility
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  // Method to log out the user
  async logOut() {
    await this._authState.logOut();
    this._router.navigateByUrl('/auth/sign-in');
  }
}
