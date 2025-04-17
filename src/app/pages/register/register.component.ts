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
import { RouterLink } from "@angular/router";
import { FormatterService } from "../../infra/formatters/formatter.service";
import { documentValidator } from "../../infra/validators/document.validator";
import { passwordValidator } from "../../infra/validators/password.validator";
import { RegisterService } from "./services/register.service";
import { RegisterProvider } from "./services/service.provider";

interface RegisterForm {
	email: FormControl<string>;
	password: FormControl<string>;
	name: FormControl<string>;
	document: FormControl<string>;
}

@Component({
	selector: "register-page",
	templateUrl: "./register.component.html",
	providers: [RegisterProvider],
	imports: [RouterLink, ReactiveFormsModule, NgClass],
})
export class RegisterComponent implements OnInit {
	private readonly formatterService = inject(FormatterService);
	private readonly registerService = inject(RegisterService);

	customClasses: Record<keyof RegisterForm, Record<string, boolean>> = {
		name: {},
		password: {},
		document: {},
		email: {},
	};

	registerForm = new FormGroup<RegisterForm>({
		email: new FormControl("", {
			nonNullable: true,
			validators: [Validators.required, Validators.email],
		}),
		name: new FormControl("", {
			nonNullable: true,
			validators: [Validators.required, Validators.min(1)],
		}),
		document: new FormControl("", {
			nonNullable: true,
			validators: [Validators.required, documentValidator()],
		}),
		password: new FormControl("", {
			nonNullable: true,
			validators: [
				Validators.required,
				Validators.min(1),
				Validators.max(255),
				passwordValidator(),
			],
		}),
	});

	get name(): AbstractControl<string, string> {
		return this.registerForm.get("name") as AbstractControl<string, string>;
	}

	get hasNameErrors() {
		return this.name.invalid && this.name.dirty && this.name.touched;
	}

	get document(): AbstractControl<string, string> {
		return this.registerForm.get("document") as AbstractControl<string, string>;
	}

	get hasDocumentErrors() {
		return (
			this.document.invalid && this.document.dirty && this.document.touched
		);
	}

	get password(): AbstractControl<string, string> {
		return this.registerForm.get("password") as AbstractControl<string, string>;
	}

	get hasPasswordErrors() {
		return (
			this.password.invalid && this.password.dirty && this.password.touched
		);
	}

	get email(): AbstractControl<string, string> {
		return this.registerForm.get("email") as AbstractControl<string, string>;
	}

	get hasEmailErrors() {
		return this.email.invalid && this.email.dirty && this.email.touched;
	}

	private isInvalid(status: FormControlStatus) {
		return status === "INVALID";
	}

	onSubmit() {
		this.registerService
			.register({
				document: this.document.value,
				email: this.email.value,
				name: this.name.value,
				password: this.password.value,
			})
			.subscribe((result) => {
				console.log(result);
			});
	}

	ngOnInit(): void {
		this.registerForm.controls.document.valueChanges.subscribe((document) => {
			const formattedDocument = this.formatterService.formatDocument(
				String(document),
			);

			if (document !== formattedDocument) {
				this.document.setValue(formattedDocument, {
					emitEvent: false,
				});
			}
		});

		this.registerForm.controls.document.statusChanges.subscribe((status) => {
			this.customClasses.document = {
				...this.customClasses.document,
				"input-error": this.isInvalid(status),
			};
		});

		this.registerForm.controls.name.statusChanges.subscribe((status) => {
			this.customClasses.name = {
				...this.customClasses.name,
				"input-error": this.isInvalid(status),
			};
		});

		this.registerForm.controls.password.statusChanges.subscribe((status) => {
			this.customClasses.password = {
				...this.customClasses.password,
				"input-error": this.isInvalid(status),
			};
		});

		this.registerForm.controls.email.statusChanges.subscribe((status) => {
			this.customClasses.email = {
				...this.customClasses.email,
				"input-error": this.isInvalid(status),
			};
		});
	}
}
