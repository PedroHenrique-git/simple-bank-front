import { HttpClient } from "@angular/common/http";
import { Injectable, inject, signal } from "@angular/core";
import { environment } from "../../../../environments/environment";
import type { ServiceResponse } from "../../../infra/types/service.response";
import type { AuthDTORequest } from "./auth.dto.request";
import type { AuthDTOResponse } from "./auth.dto.response";

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
