import type {
	ValidationErrors,
	ValidatorFn,
} from "@angular/forms";
import {
	isValidCNPJ,
	isValidCPF,
} from "@brazilian-utils/brazilian-utils";
import { CPF_LENGTH } from "../constants";

export function documentValidator(): ValidatorFn {
	return (control): ValidationErrors | null => {
		const rawValue: string = control.value.replace(
			/\D/g,
			"",
		);

		if (rawValue.length <= CPF_LENGTH) {
			return !isValidCPF(rawValue)
				? { message: "Invalid CPF" }
				: null;
		}

		return !isValidCNPJ(rawValue)
			? { message: "Invalid CNPJ" }
			: null;
	};
}
