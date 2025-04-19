import type { HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { catchError, switchMap } from "rxjs";
import { AuthService } from "../../modules/auth/services/auth.service";

export function refreshToken(req: HttpRequest<unknown>, next: HttpHandlerFn) {
	const service = inject(AuthService);
	const token = service.authToken;

	if (token || req.url.includes("refresh-token")) {
		return next(req);
	}

	return service.refreshToken().pipe(
		switchMap((payload) => {
			if (!payload?.success) {
				return next(req);
			}

			service.authToken = payload.data.authToken;

			return next(req);
		}),
		catchError(() => next(req)),
	);
}
