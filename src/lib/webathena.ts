// copied from moiraverse which is copied from matrix class group chats code

import WinChan from 'winchan';
import type { WebAthenaSession, WebAthenaResponse } from './types';

const webathena_host = 'https://webathena.mit.edu';
const realm = 'ATHENA.MIT.EDU';
const services = [
	{ realm, principal: ['moira', 'moira7.mit.edu'] },
	{ realm, principal: ['smtp', 'outgoing.mit.edu'] }
];

/**
 * Logs in with WebAthena.
 *
 * Returns a promise that resolves with the result,
 * or raise the error.
 */
export function loginWebathena(): Promise<unknown> {
	let resolve: (value: WebAthenaSession[]) => void;
	let reject: (reason: string | null) => void;
	const promise = new Promise((resolver, rejecter) => {
		resolve = resolver;
		reject = rejecter;
	});
	WinChan.open(
		{
			url: `${webathena_host}/#!request_ticket_v1`,
			relay_url: `${webathena_host}/relay.html`,
			params: { services }
		},
		function (err: string | null, r: unknown) {
			console.log('Webathena responded with', r);
			if (err) {
				console.error('There was a WebAthena error:', err);
				reject(err);
			} else if ((r as WebAthenaResponse).status !== 'OK') {
				reject(err);
			} else {
				resolve((r as WebAthenaResponse).sessions);
			}
		}
	);
	return promise;
}

export function encodeMoiraTicket(webathenaSessions: WebAthenaSession[] | null) {
	if (webathenaSessions === null) {
		return null;
	}
	const session = webathenaSessions[0];
	return btoa(JSON.stringify(session));
}

export function encodeEmailTicket(webathenaSessions: WebAthenaSession[] | null) {
	if (webathenaSessions === null) {
		return null;
	}
	const session = webathenaSessions[1];
	return btoa(JSON.stringify(session));
}

// This the same as /whoami on the moira-rest-api
export function getUsername(webathena: WebAthenaSession[] | null) {
	if (webathena === null) {
		return null;
	}
	return webathena[0].cname.nameString[0];
}

export type { WebAthenaSession };
