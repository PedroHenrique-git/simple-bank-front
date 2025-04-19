import type { Routes } from "@angular/router";
import { alreadyAuthenticated } from "../../infra/guards/already-authenticated.guard";
import { AuthComponent } from "./auth.component";

export const routes: Routes = [
	{
		path: "",
		component: AuthComponent,
		canActivate: [alreadyAuthenticated()],
	},
];
