import { HttpClient } from "@angular/common/http";
import { Injectable, inject, signal } from "@angular/core";
import { catchError, of } from "rxjs";
import { environment } from "../../../../environments/environment";
import type { ServiceResponse } from "../../../infra/types/service.response";
import type { AuthDTORequest } from "./auth.dto.request";
import type { AuthDTOResponse } from "./auth.dto.response";
import type { AuthRefreshTokenDTOResponse } from "./auth.refresh-token.dto.response";

type Nullable<T> = T | null;

@Injectable({ providedIn: "root" })
export class AuthService {
	private readonly _authToken = signal<Nullable<string>>(null);
	private readonly http = inject(HttpClient);

	login(dto: AuthDTORequest) {
		return this.http.post<ServiceResponse<AuthDTOResponse>>(
			`${environment.apiUrl}/api/v1/auth/login`,
			dto,
			{ withCredentials: true },
		);
	}

	refreshToken() {
		return this.http.post<ServiceResponse<AuthRefreshTokenDTOResponse>>(
			`${environment.apiUrl}/api/v1/auth/refresh-token`,
			null,
			{ withCredentials: true },
		);
	}

	refreshOnInit() {
		this.refreshToken()
			.pipe(catchError(() => of(null)))
			.subscribe((payload) => {
				if (!payload?.success) {
					return;
				}

				this.authToken = payload.data.authToken;
			});
	}

	get isAuthenticated() {
		return Boolean(this._authToken());
	}

	get authToken() {
		return this._authToken();
	}

	set authToken(token: Nullable<string>) {
		this._authToken.set(token);
	}
}
