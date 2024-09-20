// Copied from moiraverse to avoid reinventing the wheel,
// at some point we could create a javascript moira library?

import { PUBLIC_MOIRA_API } from '$env/static/public';
import type { MemberType, MoiraException, HttpMethod } from '$lib/types';

type QueryOptions = {
	method: HttpMethod;
	path: string;
	ticket: string;
	params?: Map<string, string> | undefined;
};

export async function makeQuery({ method, path, ticket, params }: QueryOptions): Promise<any> {
	let param_path = '';
	if (params !== undefined) {
		param_path = '?';
		for (const [key, value] of params) {
			param_path += `${key}=${value}&`;
		}
		param_path = param_path.slice(0, -1);
	}
	const response = await fetch(`${PUBLIC_MOIRA_API}${path}${param_path}`, {
		headers: {
			Authorization: `webathena ${ticket}`
		},
		method
	});
	const json = await response.json();
	if (response.status !== 200) {
		// TODO check is instance of MoiraException?
		throw json;
	}
	return json;
}

function makeParamsList(args: Map<string, string | boolean | number | undefined>) {
	let parameterMap;

	for (const [key, value] of args) {
		if (value !== undefined) {
			if (parameterMap === undefined) {
				parameterMap = new Map<string, string>();
			}
			parameterMap.set(key, value.toString());
		}
	}
	return parameterMap;
}

export async function getLists(
	ticket: string,
	user = 'me',
	include_properties?: boolean,
	recurse?: boolean
): Promise<string[]> {
	const lists: string[] = await makeQuery({
		method: 'GET',
		path: `/users/${user}/lists`,
		ticket,
		params: makeParamsList(
			new Map([
				['include_properties', include_properties],
				['recurse', recurse]
			])
		)
	});
	lists.sort();
	return lists;
}

export async function addUserToList(
	ticket: string,
	list: string,
	member = 'me',
	type: MemberType = 'user'
): Promise<'success' | MoiraException> {
	return await makeQuery({
		method: 'PUT',
		path: `/lists/${list}/members/${member}`,
		ticket,
		params: makeParamsList(new Map([['type', type]]))
	});
}

export async function delUserFromList(
	ticket: string,
	list: string,
	member = 'me',
	type: MemberType = 'user'
): Promise<'success' | MoiraException> {
	return await makeQuery({
		method: 'DELETE',
		path: `/lists/${list}/members/${member}`,
		ticket,
		params: makeParamsList(new Map([['type', type]]))
	});
}