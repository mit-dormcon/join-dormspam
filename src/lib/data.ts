export enum ListType { mailman, moira }

// List for people off-campus, etc
export const commonDormspamList = "dormspam-catch-all";

export type Dorm = {
    listName: string;
    listType: ListType;
    friendlyName: string;
}

export const prefix = "gsc-clearance-hms-";

export const dormspamLists: Map<string, Dorm> = new Map([
    ["baker-house", {
        friendlyName: "Baker",
        listName: "baker-forum",
        listType: ListType.mailman,
    }],
    ["burton-conner-house", {
        friendlyName: "BC",
        listName: "bc-talk",
        listType: ListType.mailman,
    }],
    ["east-campus", {
        friendlyName: "East Campus",
        listName: "ec-discuss",
        listType: ListType.moira,
    }],
    ["macgregor-house", {
        friendlyName: "MacGregor",
        listName: "macgregor",
        listType: ListType.mailman,
    }],
    ["maseeh-hall", {
        friendlyName: "Maseeh",
        listName: "maseeh-talk",
        listType: ListType.mailman,
    }],
    ["mccormick-hall", {
        friendlyName: "McCormick",
        listName: "mccormick-announce",
        listType: ListType.moira,
    }],
    ["new-house", {
        friendlyName: "New House",
        listName: "nh-forum",
        listType: ListType.moira,
    }],
    ["new-vassar", {
        friendlyName: "New Vassar",
        listName: "new-vassar-forum",
        listType: ListType.mailman,
    }],
    ["next-house", {
        friendlyName: "Next",
        listName: "next-forum",
        listType: ListType.moira,
    }],
    ["random-hall", {
        friendlyName: "Random",
        listName: "random-hall-dormspam",
        listType: ListType.moira,
    }],
    ["simmons-hall", {
        friendlyName: "Simmons",
        listName: "sponge-talk",
        listType: ListType.mailman,
    }]
]);
