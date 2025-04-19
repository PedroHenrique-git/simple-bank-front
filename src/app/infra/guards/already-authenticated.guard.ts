import { inject } from "@angular/core";
import { type CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../../modules/auth/services/auth.service";

export const alreadyAuthenticated = (): CanActivateFn => {
	return () => {
		const authService = inject(AuthService);
		const router = inject(Router);

		const isNotAuthenticated = !authService.isAuthenticated;

		if (isNotAuthenticated) {
			return true;
		}

		return router.createUrlTree(["/"]);
	};
};
