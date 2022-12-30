export default function formDataToJSON(formData: FormData) {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const object: any = {};
	formData.forEach((value, key) => {
		if (!Reflect.has(object, key)) {
			object[key] = value;
			return;
		}

		if (!Array.isArray(object[key])) {
			object[key] = [object[key]];
		}
		object[key].push(value);
	});

	return object;
}
