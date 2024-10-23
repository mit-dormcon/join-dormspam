// copied from moiraverse which is copied from matrix class group chats code

import WinChan from 'winchan';

const webathena_host = 'https://webathena.mit.edu';
const realm = 'ATHENA.MIT.EDU';
const services = [
	{ realm, principal: ['moira', 'moira7.mit.edu'] },
	{ realm, principal: ['smtp', 'outgoing.mit.edu'] }
];

export interface Response {
	status: string;
	sessions: WebAthenaSession[];
}

export interface WebAthenaSession {
	authtime: number;
	cname: {
		nameString: string[];
		nameType: number;
	};
	crealm: string;
	endtime: string;
	flags: number[];
	key: {
		keytype: number;
		keyvalue: string;
	};
	sname: {
		nameString: string[];
		nameType: number;
	};
	srealm: string;
	starttime: number;
	ticket: {
		encPart: {
			cipher: string;
			etype: number;
			kvno: number;
		};
		realm: string;
		sname: {
			nameString: string[];
			nameType: number;
		};
		tktVno: number;
	};
}

/**
 * Logs in with WebAthena.
 *
 * Returns a promise that resolves with the result,
 * or raise the error.
 */
export function loginWebathena(): Promise<unknown> {
	let resolve: (value: WebAthenaSession[]) => void;
	let reject: (reason?: string) => void;
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
		function (err: string | undefined, r: Response) {
			console.log('Webathena responded with', r);
			if (err) {
				console.error('There was a WebAthena error:', err);
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
