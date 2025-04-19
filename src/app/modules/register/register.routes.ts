import type { Routes } from "@angular/router";
import { alreadyAuthenticated } from "../../infra/guards/already-authenticated.guard";
import { RegisterComponent } from "./register.component";

export const routes: Routes = [
	{
		path: "",
		component: RegisterComponent,
		canActivate: [alreadyAuthenticated()],
	},
];
