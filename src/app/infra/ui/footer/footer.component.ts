import { Component, Input } from "@angular/core";

@Component({
	selector: "app-footer",
	templateUrl: "./footer.template.html",
})
export class FooterComponent {
	@Input() date = new Date().getFullYear();
}
