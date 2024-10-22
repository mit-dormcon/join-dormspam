import { makeQuery } from "./moira";

export async function requestSubscription(ticket: string, list: string) {
    return await makeQuery({
		method: 'POST',
		path: `/mailman/${list}/request_subscription`,
		ticket,
	});
}

export async function requestUnsubscription(ticket: string, list: string) {
    return await makeQuery({
		method: 'POST',
		path: `/mailman/${list}/request_unsubscription`,
		ticket,
	});
}