import { formatCNPJ, formatCPF } from "@brazilian-utils/brazilian-utils";
import { CPF_LENGTH } from "../constants";

export function documentFormatter(document: string) {
	if (document.length <= CPF_LENGTH) {
		return formatCPF(document);
	}

	return formatCNPJ(document);
}
