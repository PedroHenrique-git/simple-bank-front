import type { Routes } from "@angular/router";

export const routes: Routes = [
	{
		path: "",
		loadChildren: () =>
			import("./modules/home/home.routes").then((mod) => mod.routes),
	},
	{
		path: "register",
		loadChildren: () =>
			import("./modules/register/register.routes").then((mod) => mod.routes),
	},
	{
		path: "login",
		loadChildren: () =>
			import("./modules/auth/auth.routes").then((mod) => mod.routes),
	},
];
