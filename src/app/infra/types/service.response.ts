export type ServiceResponse<T> =
	| {
			success: true;
			message: string;
			data: T;
	  }
	| {
			success: false;
			message: string;
			errors: string[];
	  };
