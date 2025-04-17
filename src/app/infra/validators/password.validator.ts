import type { ValidationErrors, ValidatorFn } from "@angular/forms";
import { STRONG_PASSWORD_REGEX } from "../constants";

export function passwordValidator(): ValidatorFn {
	return (control): ValidationErrors | null => {
		const rawValue: string = control.value;

		return !STRONG_PASSWORD_REGEX.test(rawValue)
			? {
					message:
						"Invalid password, your password must follow the rules: at least two capital letters, at least one uppercase letter, at least two digits, at least two lowercase letters and at least eight characters.",
				}
			: null;
	};
}
