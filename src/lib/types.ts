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
