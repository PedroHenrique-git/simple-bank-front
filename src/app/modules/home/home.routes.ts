import type { Routes } from "@angular/router";
import { authGuard } from "../../infra/guards/auth.guard";
import { HomeComponent } from "./home.component";

export const routes: Routes = [
	{
		path: "",
		component: HomeComponent,
		canActivate: [authGuard()],
	},
];
