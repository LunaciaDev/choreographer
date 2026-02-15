import type { UserData, UserDataV1 } from '../types/user-data';

type AchievementData = {
    tiers: AchievementTier[];
};

type AchievementTier = {
    name: string;
    condition: AchivementCondition;
    condition_text: string;
    deco_text: string;
};

interface AchivementCondition {
    (session: UserDataV1, lifetime: UserData): boolean;
}

export const achievement_data: AchievementData[] = [
    {
        tiers: [
            {
                name: 'Factory Worker',
                condition: (_, lifetime) => lifetime.crate_crafted >= 1000,
                condition_text: 'Made at least 1k crates.',
                deco_text: 'Achievement_DecoCrate1',
            },
            {
                name: 'Apprentice Manufacturer',
                condition: (_, lifetime) => lifetime.crate_crafted >= 10000,
                condition_text: 'Made at least 10k crates.',
                deco_text: 'Achievement_DecoCrate2',
            },
            {
                name: 'Industrial Powerhouse',
                condition: (_, lifetime) => lifetime.crate_crafted >= 100000,
                condition_text: 'Made at least 100k crates.',
                deco_text: 'Achievement_DecoCrate3',
            },
            {
                name: 'Walking Cratastrophy',
                condition: (_, lifetime) => lifetime.crate_crafted >= 500000,
                condition_text: 'Made at least 500k crates.',
                deco_text: 'Almost enough for a frontline operation.',
            },
        ],
    },
    {
        tiers: [
            {
                name: 'Achivement_BM1',
                condition: (_, lifetime) =>
                    lifetime.material_consumed.bmat >= 10000,
                condition_text: 'Consumed at least 10k bmats.',
                deco_text: 'Achivement_DecoBM1',
            },
            {
                name: 'Achivement_BM2',
                condition: (_, lifetime) =>
                    lifetime.material_consumed.bmat >= 100000,
                condition_text: 'Consumed at least 100k bmats.',
                deco_text: 'Achivement_DecoBM2',
            },
            {
                name: 'Achivement_BM3',
                condition: (_, lifetime) =>
                    lifetime.material_consumed.bmat >= 1000000,
                condition_text: 'Consumed at least 1m bmats.',
                deco_text: 'Achivement_DecoBM3',
            },
        ],
    },
    {
        tiers: [
            {
                name: 'Achievement_EM1',
                condition: (_, lifetime) =>
                    lifetime.material_consumed.emat >= 5000,
                condition_text: 'Consumed at least 5k emats.',
                deco_text: 'Achivement_DecoEM1',
            },
            {
                name: 'Achievement_EM2',
                condition: (_, lifetime) =>
                    lifetime.material_consumed.emat >= 50000,
                condition_text: 'Consumed at least 50k emats.',
                deco_text: 'Achivement_DecoEM2',
            },
            {
                name: 'Achievement_EM3',
                condition: (_, lifetime) =>
                    lifetime.material_consumed.emat >= 500000,
                condition_text: 'Consumed at least 500k emats.',
                deco_text: 'Achivement_DecoEM3',
            },
        ],
    },
    {
        tiers: [
            {
                name: 'Achievement_HM1',
                condition: (_, lifetime) =>
                    lifetime.material_consumed.hemat >= 2500,
                condition_text: 'Consumed at least 2.5k hemats.',
                deco_text: 'Achivement_DecoHM1',
            },
            {
                name: 'Achievement_HM2',
                condition: (_, lifetime) =>
                    lifetime.material_consumed.hemat >= 25000,
                condition_text: 'Consumed at least 25k hemats.',
                deco_text: 'Achivement_DecoHM1',
            },
            {
                name: 'Achievement_HM3',
                condition: (_, lifetime) =>
                    lifetime.material_consumed.hemat >= 250000,
                condition_text: 'Consumed at least 250k hemats.',
                deco_text: 'Achivement_DecoHM1',
            },
        ],
    },
    {
        tiers: [
            {
                name: 'Achievement_RM1',
                condition: (_, lifetime) =>
                    lifetime.material_consumed.rmat >= 2500,
                condition_text: 'Consumed at least 2.5k rmats.',
                deco_text: 'Achivement_DecoRM1',
            },
            {
                name: 'Achievement_RM2',
                condition: (_, lifetime) =>
                    lifetime.material_consumed.rmat >= 25000,
                condition_text: 'Consumed at least 25k rmats.',
                deco_text: 'Achivement_DecoRM2',
            },
            {
                name: 'Achievement_RM3',
                condition: (_, lifetime) =>
                    lifetime.material_consumed.rmat >= 250000,
                condition_text: 'Consumed at least 250k rmats.',
                deco_text: 'Achivement_DecoRM3',
            },
        ],
    },
    {
        tiers: [
            {
                name: 'Morning Shift',
                condition: (_, lifetime) => lifetime.time_spent >= 3600,
                condition_text: 'Spent 1 hour manufacturing.',
                deco_text: 'Achivement_DecoT1',
            },
            {
                name: 'Achievement_T2',
                condition: (_, lifetime) => lifetime.time_spent >= 86400,
                condition_text: 'Spent 1 day manufacturing.',
                deco_text: 'Achivement_DecoT2',
            },
            {
                name: 'Achievement_T3',
                condition: (_, lifetime) => lifetime.time_spent >= 604800,
                condition_text: 'Spent 1 week manufacturing.',
                deco_text: 'Maybe you should touch grass...',
            },
            {
                name: 'One with the Machine',
                condition: (_, lifetime) => lifetime.time_spent >= 2629800,
                condition_text: 'Spent... 1 month manufacturing?!',
                deco_text: "That's some serious dedication, for sure.",
            },
        ],
    },
    {
        tiers: [
            {
                name: 'Achievement_SC1',
                condition: (session, _) => session.crate_crafted >= 60,
                condition_text: 'Made 60 crates in a single session.',
                deco_text: 'One whole container of war materiel!',
            },
            {
                name: 'Achievement_SC2',
                condition: (session, _) => session.crate_crafted >= 300,
                condition_text: 'Made 300 crates in a single session.',
                deco_text: 'An entire freighters full of produces.',
            },
            {
                name: 'Achievement_SC3',
                condition: (session, _) => session.crate_crafted >= 720,
                condition_text: 'Made 720 crates in a single session.',
                deco_text: 'One full train of supplies in one go!',
            },
            {
                name: 'Achievement_SC4',
                condition: (session, _) => session.crate_crafted >= 2000,
                condition_text: 'Made 2000 crates in a single session.',
                deco_text: 'Our stock would be good for a while...',
            },
        ],
    },
    {
        tiers: [
            {
                name: 'BMAT User',
                condition: (session, _) =>
                    session.material_consumed.bmat >= 30000,
                condition_text: 'Consumed 30k bmats in a single session.',
                deco_text: "That's a lot of bmats!",
            },
            {
                name: 'BMAT Consumer',
                condition: (session, _) =>
                    session.material_consumed.bmat >= 90000,
                condition_text: 'Consumed 90k bmats in a single session.',
                deco_text: 'I would suggest helping to replace those.',
            },
            {
                name: 'BMAT Blackhole',
                condition: (session, _) =>
                    session.material_consumed.bmat >= 150000,
                condition_text: 'Consumed 150k bmats in a single session.',
                deco_text:
                    'Now you have become the Factory, consumer of BMATs.',
            },
        ],
    },
    {
        tiers: [
            {
                name: 'Achievement_E1',
                condition: (session, _) =>
                    session.crate_crafted >= 300 &&
                    Math.round(
                        session.time_spent / (session.crate_crafted / 100)
                    ) <= 1440,
                condition_text:
                    'Maintained a pace at least 100 crates every 24 minutes in a session making over 300 crates.',
                deco_text: 'Achivement_DecoE1',
            },
            {
                name: 'Achievement_E2',
                condition: (session, _) =>
                    session.crate_crafted >= 300 &&
                    Math.round(
                        session.time_spent / (session.crate_crafted / 100)
                    ) <= 1200,
                condition_text:
                    'Maintained a pace at least 100 crates every 20 minutes in a session making over 300 crates.',
                deco_text: 'Achivement_DecoE2',
            },
            {
                name: 'Achievement_E3',
                condition: (session, _) =>
                    session.crate_crafted >= 300 &&
                    Math.round(
                        session.time_spent / (session.crate_crafted / 100)
                    ) <= 1080,
                condition_text:
                    'Maintained a pace at least 100 crates every 18 minutes in a session making over 300 crates.',
                deco_text: 'Achivement_DecoE3',
            },
            {
                name: 'Maximum Overdrive',
                condition: (session, _) =>
                    session.crate_crafted >= 300 &&
                    Math.round(
                        session.time_spent / (session.crate_crafted / 100)
                    ) <= 960,
                condition_text:
                    'Maintained a pace at least 100 crates every 16 minutes in a session making over 300 crates.',
                deco_text: 'How did you go that fast..?',
            },
        ],
    },
    {
        tiers: [
            {
                name: 'Three Stockpiles of Bayo',
                condition: (session, _) => {
                    for (const item of session.item_crafted) {
                        if (item.id === 81) {
                            return item.amount >= 900;
                        }
                    }
                    return false;
                },
                condition_text:
                    'Made at least 900 crates of Bayonets in a single session',
                deco_text:
                    'Racoon would be proud.. though you used your own bmats right?',
            },
        ],
    },
];
