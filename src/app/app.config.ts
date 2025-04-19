import {
	type ApplicationConfig,
	inject,
	provideAppInitializer,
	provideZoneChangeDetection,
} from "@angular/core";
import { provideRouter } from "@angular/router";

import {
	provideHttpClient,
	withFetch,
	withInterceptors,
} from "@angular/common/http";
import {
	provideClientHydration,
	withEventReplay,
} from "@angular/platform-browser";
import { routes } from "./app.routes";
import { authToken } from "./infra/interceptors/auth.interceptor";
import { refreshToken } from "./infra/interceptors/refresh-token.interceptor";
import { AuthService } from "./modules/auth/services/auth.service";

export const appConfig: ApplicationConfig = {
	providers: [
		provideHttpClient(withFetch(), withInterceptors([refreshToken, authToken])),
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideRouter(routes),
		provideClientHydration(withEventReplay()),
		provideAppInitializer(() => {
			const authService = inject(AuthService);

			authService.refreshOnInit();
		}),
	],
};
