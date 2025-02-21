import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private _authService : AuthService = inject(AuthService);
  private router: Router = inject(Router);

  constructor() {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const publicRoutes = ['/login', '/register'];
  
    if (publicRoutes.includes(state.url)) {
      return true; // Permitir el acceso a estas rutas sin importar el estado del usuario
    }
  
    if (this._authService.isLoggedIn()) {
      return true; // Si está logeado, puede entrar
    } else {
      this.router.navigate(['/login']);
      return false; // Si no está logeado, lo redirige al login
    }
  }

}
