import { Component, inject } from "@angular/core";
import {
	type AbstractControl,
	FormControl,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from "@angular/forms";
import { RouterLink } from "@angular/router";
import { FormatterService } from "../../infra/formatters/formatter-service";
import { documentValidator } from "../../infra/validators/document.validator";
import { passwordValidator } from "../../infra/validators/password.validator";

interface RegisterForm {
	email: FormControl<string>;
	password: FormControl<string>;
	name: FormControl<string>;
	document: FormControl<string>;
}

@Component({
	selector: "register-page",
	templateUrl: "./register.component.html",
	imports: [RouterLink, ReactiveFormsModule],
})
export class RegisterComponent {
	private readonly formatterService = inject(
		FormatterService,
	);

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
			validators: [
				Validators.required,
				documentValidator(),
			],
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
		return this.registerForm.get("name") as AbstractControl<
			string,
			string
		>;
	}

	get document(): AbstractControl<string, string> {
		return this.registerForm.get(
			"document",
		) as AbstractControl<string, string>;
	}

	get password(): AbstractControl<string, string> {
		return this.registerForm.get(
			"password",
		) as AbstractControl<string, string>;
	}

	get email(): AbstractControl<string, string> {
		return this.registerForm.get(
			"email",
		) as AbstractControl<string, string>;
	}

	ngOnInit() {
		this.document.valueChanges.subscribe((document) => {
			const formattedDocument =
				this.formatterService.formatDocument(document);

			document !== formattedDocument &&
				this.document.setValue(formattedDocument);

			console.log(this.document.errors);
		});
	}

	onSubmit() {
		console.log("registering user...");
	}
}
