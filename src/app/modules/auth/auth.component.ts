import { NgClass } from "@angular/common";
import { Component, type OnInit, inject } from "@angular/core";
import {
	type AbstractControl,
	FormControl,
	type FormControlStatus,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { ToastService } from "../../infra/ui/toast/services/toast.service";
import { AuthService } from "./services/auth.service";

interface AuthForm {
	email: FormControl<string>;
	password: FormControl<string>;
}

@Component({
	selector: "app-auth",
	templateUrl: "./auth.component.html",
	imports: [ReactiveFormsModule, RouterLink, NgClass],
})
export class AuthComponent implements OnInit {
	private readonly authService = inject(AuthService);
	private readonly toastService = inject(ToastService);
	private readonly router = inject(Router);

	customClasses: Record<keyof AuthForm, Record<string, boolean>> = {
		password: {},
		email: {},
	};

	authForm: FormGroup<AuthForm> = new FormGroup({
		email: new FormControl("", {
			nonNullable: true,
			validators: [Validators.required, Validators.email],
		}),
		password: new FormControl("", {
			nonNullable: true,
			validators: [Validators.required],
		}),
	});

	get password(): AbstractControl<string, string> {
		return this.authForm.get("password") as AbstractControl<string, string>;
	}

	get hasPasswordErrors() {
		return (
			this.password.invalid && this.password.dirty && this.password.touched
		);
	}

	get email(): AbstractControl<string, string> {
		return this.authForm.get("email") as AbstractControl<string, string>;
	}

	get hasEmailErrors() {
		return this.email.invalid && this.email.dirty && this.email.touched;
	}

	private isInvalid(status: FormControlStatus) {
		return status === "INVALID";
	}

	onSubmit() {
		this.authService
			.login({
				email: this.email.value,
				password: this.password.value,
			})
			.subscribe((payload) => {
				if (!payload.success) {
					this.toastService.showToast({
						message: "Something went wrong, try again later!",
					});

					return;
				}

				const {
					data: { authToken },
				} = payload;

				this.authService.authToken = authToken;

				this.toastService.showToast({
					message: "Login successfully",
					type: "alert-success",
				});

				this.router.navigateByUrl("/");
			});
	}

	ngOnInit(): void {
		this.authForm.controls.password.statusChanges.subscribe((status) => {
			this.customClasses.password = {
				...this.customClasses.password,
				"input-error": this.isInvalid(status),
			};
		});

		this.authForm.controls.email.statusChanges.subscribe((status) => {
			this.customClasses.email = {
				...this.customClasses.email,
				"input-error": this.isInvalid(status),
			};
		});
	}
}
