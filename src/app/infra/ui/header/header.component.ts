import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";

@Component({
	selector: "app-header",
	templateUrl: "./header.template.html",
	imports: [RouterLink],
})
export class HeaderComponent {}
