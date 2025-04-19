import { Injectable, signal } from "@angular/core";
import { timer } from "rxjs";

type Type = "alert-info" | "alert-success" | "alert-warning" | "alert-error";

interface Toast {
	id: string;
	classes: Record<string, boolean>;
	type?: Type;
	duration?: number;
	message: string;
}

@Injectable()
export class ToastService {
	private readonly DEFAULT_DURATION = 3000; // 3 seconds
	private readonly _toasts = signal<Toast[]>([]);

	get toasts() {
		return this._toasts();
	}

	showToast({
		type = "alert-info",
		duration = this.DEFAULT_DURATION,
		message,
	}: Omit<Toast, "id" | "classes">) {
		const id = globalThis.crypto.randomUUID();

		this._toasts.update((toasts) => [
			...toasts,
			{
				message,
				type,
				id,
				classes: { [type]: true },
			},
		]);

		timer(duration).subscribe(() => {
			this._toasts.update((toasts) => toasts.filter((t) => t.id !== id));
		});
	}
}
