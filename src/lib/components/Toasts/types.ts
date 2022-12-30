export type Kind =
	| 'primary'
	| 'secondary'
	| 'success'
	| 'danger'
	| 'warning'
	| 'info'
	| 'light'
	| 'dark'
	| 'loading';

export type Toast = {
	id: string;
	kind: Kind;
	title: string;
	message: string;
	closeAfterMs?: number;
};

export type ToastCreateInput = Omit<Toast, 'id'>;
