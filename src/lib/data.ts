export const ListType = {
	mailman: 0,
	moira: 1
} as const;

// List for people off-campus, etc
export const commonDormspamList = 'dormspam-catch-all';

export type Dorm = {
	listName: string;
	listType: (typeof ListType)[keyof typeof ListType];
	friendlyName: string;
};

export const prefix = 'gsc-clearance-hms-';

export const dormspamLists: Map<string, Dorm> = new Map([
	[
		'baker-house',
		{
			friendlyName: 'Baker',
			listName: 'baker-forum',
			listType: ListType.mailman
		}
	],
	[
		'burton-conner-house',
		{
			friendlyName: 'BC',
			listName: 'bc-talk',
			listType: ListType.moira
		}
	],
	[
		'east-campus',
		{
			friendlyName: 'East Campus',
			listName: 'ec-discuss',
			listType: ListType.moira
		}
	],
	[
		'macgregor-house',
		{
			friendlyName: 'MacGregor',
			listName: 'macgregor',
			listType: ListType.mailman
		}
	],
	[
		'maseeh-hall',
		{
			friendlyName: 'Maseeh',
			listName: 'maseeh-talk',
			listType: ListType.mailman
		}
	],
	[
		'mccormick-hall',
		{
			friendlyName: 'McCormick',
			listName: 'mccormick-announce',
			listType: ListType.moira
		}
	],
	[
		'new-house',
		{
			friendlyName: 'New House',
			listName: 'nh-forum',
			listType: ListType.moira
		}
	],
	[
		'new-vassar',
		{
			friendlyName: 'New Vassar',
			listName: 'new-vassar-forum',
			listType: ListType.mailman
		}
	],
	[
		'next-house',
		{
			friendlyName: 'Next',
			listName: 'next-forum',
			listType: ListType.moira
		}
	],
	[
		'random-hall',
		{
			friendlyName: 'Random',
			listName: 'random-hall-dormspam',
			listType: ListType.moira
		}
	],
	[
		'simmons-hall',
		{
			friendlyName: 'Simmons',
			listName: 'sponge-talk',
			listType: ListType.mailman
		}
	]
]);

// TODO: ask during the dormcon GBM for dorms to change settings for auto-subscribe,
// and to get the list of "requires approval to subscribe" lists

/// Mailman lists that need no further action after requesting a subscription
export const mailmanAutoSubscribe = ['sponge-talk'];

/// Mailman lists that require approval from a moderator either way
// TODO: test all of them and see which ones require approval
export const mailmanRequiresApproval = ['baker-forum'];
