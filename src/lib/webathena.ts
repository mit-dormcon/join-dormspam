// copied from moiraverse which is copied from matrix class group chats code

import WinChan from 'winchan';

const webathena_host = 'https://webathena.mit.edu';
const realm = 'ATHENA.MIT.EDU';
const services = [
	{ realm, principal: ['moira', 'moira7.mit.edu'] },
	{ realm, principal: ['smtp', 'outgoing.mit.edu'] },
];

/**
 * Logs in with WebAthena.
 *
 * Returns a promise that resolves with the result,
 * or raise the error.
 */
export function loginWebathena(): Promise<any> {
	let resolve: Function;
	let reject: Function;
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
		function (err: any, r: any) {
			console.log("Webathena responded with", r);
			if (err) {
				console.log("There was a WebAthena error:", err);
				reject(err);
			} else if (r.status !== 'OK') {
				reject(err);
			} else {
				resolve(r.sessions);
			}
		}
	);
	return promise;
}

export function encodeMoiraTicket(webathenaSessions: any) {
	const session = webathenaSessions[0];
	return btoa(JSON.stringify(session));
}

export function encodeEmailTicket(webathenaSessions: any) {
	const session = webathenaSessions[0];
	return btoa(JSON.stringify(session));
}


// This the same as /whoami on the moira-rest-api
export function getUsername(webathena: any) {
    if (webathena === null) { return null; }
	return webathena[0].cname.nameString[0];
}