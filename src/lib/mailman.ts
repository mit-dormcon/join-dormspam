import { makeQuery } from './moira';
import type { MoiraException } from './types';

export async function requestSubscription(ticket: string, list: string) {
	return (await makeQuery({
		method: 'POST',
		path: `/mailman/${list}/request_subscription`,
		ticket
	})) as 'success' | MoiraException;
}

export async function requestUnsubscription(ticket: string, list: string) {
	return (await makeQuery({
		method: 'POST',
		path: `/mailman/${list}/request_unsubscription`,
		ticket
	})) as 'success' | MoiraException;
}
