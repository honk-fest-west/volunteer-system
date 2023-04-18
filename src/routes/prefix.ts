
function admin_questions_path(path: string = ''): string {
	return `/system/admin/questions${delimiter(path)}`;
}

function admin_events_path(path: string = ''): string {
	return `/system/admin/events${delimiter(path)}`;
}

function admin_volunteers_path(path: string = ''): string {
	return `/system/admin/volunteers${delimiter(path)}`;
}

function delimiter(path: string = ''): string {
	return path.length > 0 ? `/${path}` : '';
}

export const prefix = {
	admin_questions_path,
	admin_events_path,
	admin_volunteers_path,
};