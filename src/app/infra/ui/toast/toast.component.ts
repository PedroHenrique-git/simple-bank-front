import { NgClass } from "@angular/common";
import { Component, Input, inject } from "@angular/core";
import { ToastService } from "./services/toast.service";

type XPosition = "toast-start" | "toast-center" | "toast-end";
type YPosition = "toast-top" | "toast-middle" | "toast-bottom";

@Component({
	selector: "app-toast",
	templateUrl: "./toast.template.html",
	imports: [NgClass],
})
export class ToastComponent {
	@Input() xPosition: XPosition = "toast-end";
	@Input() yPosition: YPosition = "toast-top";

	private readonly toastService = inject(ToastService);

	get toasts() {
		return this.toastService.toasts;
	}
}
