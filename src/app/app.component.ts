import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { FooterComponent } from "./infra/ui/footer/footer.component";
import { HeaderComponent } from "./infra/ui/header/header.component";
import { ToastComponent } from "./infra/ui/toast/toast.component";
import { ToastProvider } from "./infra/ui/toast/toast.provider";

@Component({
	selector: "app-root",
	imports: [RouterOutlet, ToastComponent, HeaderComponent, FooterComponent],
	providers: [ToastProvider],
	templateUrl: "./app.component.html",
})
export class AppComponent {}
