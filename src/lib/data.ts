export enum ListType { mailman, moira }

const types = {
    "baker-forum": ListType.mailman,
    "bc-talk": ListType.moira,
    "ec-discuss": ListType.moira,
    "macgregor": ListType.mailman,
    "maseeh-talk": ListType.mailman,
    "mccormick-announce": ListType.moira,
    "nh-forum": ListType.moira,
    "new-vassar-forum": ListType.mailman,
    "next-forum": ListType.moira,
    "random-hall-dormspam": ListType.moira,
    "sponge-talk": ListType.mailman,
};

const lists = {
    "gsc-clearance-hms-baker-house": "baker-forum",
    "gsc-clearance-hms-burton-conner-house": "bc-talk",
    "gsc-clearance-hms-east-campus": "ec-discuss",
    "gsc-clearance-hms-macgregor-house": "macgregor",
    "gsc-clearance-hms-maseeh-hall": "maseeh-talk",
    "gsc-clearance-hms-mccormick-hall": "mccormick-announce",
    "gsc-clearance-hms-new-house": "nh-forum",
    "gsc-clearance-hms-new-vassar": "new-vassar-forum",
    "gsc-clearance-hms-next-house": "next-forum",
    "gsc-clearance-hms-random-hall": "random-hall-dormspam",
    "gsc-clearance-hms-simmons-hall": "sponge-talk"
};


