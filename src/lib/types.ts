// copied from moiraverse

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export type MoiraException = {
	/**
	 * Internal Moira error code
	 */
	code: number;

	/**
	 * Error message from Moira
	 */
	message: string;

	/**
	 * Abbreviated error ID, such as MR_PERM
	 */
	name: string;
};

export type MemberType = 'user' | 'email' | 'list' | 'kerberos';

// webathena inferred types

export interface WebAthenaResponse {
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
