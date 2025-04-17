import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { environment } from "../../../../environments/environment";
import type { ServiceResponse } from "../../../infra/types/service.response";
import type { RegisterDTORequest } from "./register.dto.request";
import type { RegisterDTOResponse } from "./register.dto.response";

@Injectable()
export class RegisterService {
	private readonly http = inject(HttpClient);

	register(dto: RegisterDTORequest) {
		return this.http.post<ServiceResponse<RegisterDTOResponse>>(
			`${environment.apiUrl}/api/v1/accounts`,
			dto,
		);
	}
}
