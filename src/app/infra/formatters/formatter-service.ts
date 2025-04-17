import { Injectable } from "@angular/core";
import { documentFormatter } from "./document-formatter";

@Injectable({
	providedIn: "root",
})
export class FormatterService {
	formatDocument(document: string) {
		return documentFormatter(document);
	}
}
