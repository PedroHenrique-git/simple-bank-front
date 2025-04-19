import type { HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthService } from "../../modules/auth/services/auth.service";

export function authToken(req: HttpRequest<unknown>, next: HttpHandlerFn) {
	const service = inject(AuthService);
	const token = service.authToken;

	const newReq = req.clone({
		...(token
			? { headers: req.headers.append("Authorization", `Bearer ${token}`) }
			: {}),
	});

	return next(newReq);
}
