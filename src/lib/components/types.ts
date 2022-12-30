const BootstrapColors = [
	'primary',
	'secondary',
	'success',
	'danger',
	'warning',
	'info',
	'light',
	'dark'
] as const;

export type BootstrapColor = typeof BootstrapColors[number];
