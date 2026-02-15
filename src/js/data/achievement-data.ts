import type { UserData, UserDataV1 } from '../types/user-data';

type AchievementData = {
    tiers: AchievementTier[];
};

type AchievementTier = {
    name: string;
    condition: AchivementCondition;
    deco_text: string;
};

interface AchivementCondition {
    (session: UserDataV1, lifetime: UserData): boolean;
}

export const achievement_data: AchievementData[] = [
    // Lifetime Achivements Set
    {
        // Crate Manufactured
        tiers: [
            {
                name: '',
                condition: (_, lifetime) => lifetime.crate_crafted >= 1000,
                deco_text: '',
            },
            {
                name: '',
                condition: (_, lifetime) => lifetime.crate_crafted >= 10000,
                deco_text: '',
            },
            {
                name: '',
                condition: (_, lifetime) => lifetime.crate_crafted >= 75000,
                deco_text: '',
            },
            {
                name: 'Walking Cratastrophy',
                condition: (_, lifetime) => lifetime.crate_crafted >= 200000,
                deco_text: 'Almost enough for a frontline operation.',
            },
        ],
    },
    {
        // BMATs Consumed
        tiers: [
            {
                name: '',
                condition: (_, lifetime) =>
                    lifetime.material_consumed.bmat >= 10000,
                deco_text: '',
            },
            {
                name: '',
                condition: (_, lifetime) =>
                    lifetime.material_consumed.bmat >= 100000,
                deco_text: '',
            },
            {
                name: '',
                condition: (_, lifetime) =>
                    lifetime.material_consumed.bmat >= 1000000,
                deco_text: '',
            },
        ],
    },
    {
        // EMATs Consumed
        tiers: [
            {
                name: '',
                condition: (_, lifetime) =>
                    lifetime.material_consumed.emat >= 5000,
                deco_text: '',
            },
            {
                name: '',
                condition: (_, lifetime) =>
                    lifetime.material_consumed.emat >= 50000,
                deco_text: '',
            },
            {
                name: '',
                condition: (_, lifetime) =>
                    lifetime.material_consumed.emat >= 500000,
                deco_text: '',
            },
        ],
    },
    {
        // HEMATs Consumed
        tiers: [
            {
                name: '',
                condition: (_, lifetime) =>
                    lifetime.material_consumed.hemat >= 2500,
                deco_text: '',
            },
            {
                name: '',
                condition: (_, lifetime) =>
                    lifetime.material_consumed.hemat >= 25000,
                deco_text: '',
            },
            {
                name: '',
                condition: (_, lifetime) =>
                    lifetime.material_consumed.hemat >= 250000,
                deco_text: '',
            },
        ],
    },
    {
        // RMATs Consumed
        tiers: [
            {
                name: '',
                condition: (_, lifetime) =>
                    lifetime.material_consumed.rmat >= 2500,
                deco_text: '',
            },
            {
                name: '',
                condition: (_, lifetime) =>
                    lifetime.material_consumed.rmat >= 25000,
                deco_text: '',
            },
            {
                name: '',
                condition: (_, lifetime) =>
                    lifetime.material_consumed.rmat >= 250000,
                deco_text: '',
            },
        ],
    },
    {
        // Time Spent
        tiers: [
            {
                name: '',
                condition: (_, lifetime) => lifetime.time_spent >= 3600,
                deco_text: '',
            },
            {
                name: '',
                condition: (_, lifetime) => lifetime.time_spent >= 86400,
                deco_text: '',
            },
            {
                name: '',
                condition: (_, lifetime) => lifetime.time_spent >= 604800,
                deco_text:
                    '1 week of manu time! Maybe you should touch grass...',
            },
        ],
    },
    // Session Achievement Set
    {
        // Crate Manufactured
        tiers: [
            {
                name: '',
                condition: (session, _) => session.crate_crafted >= 60,
                deco_text: '',
            },
            {
                name: '',
                condition: (session, _) => session.crate_crafted >= 300,
                deco_text: '',
            },
            {
                name: '',
                condition: (session, _) => session.crate_crafted >= 720,
                deco_text: '',
            },
            {
                name: '',
                condition: (session, _) => session.crate_crafted >= 2000,
                deco_text: '',
            },
        ],
    },
    {
        // BMAT Consumed
        tiers: [
            {
                name: '',
                condition: (session, _) =>
                    session.material_consumed.bmat >= 30000,
                deco_text: '',
            },
            {
                name: '',
                condition: (session, _) =>
                    session.material_consumed.bmat >= 90000,
                deco_text: '',
            },
        ],
    },
    {
        // Efficiency (time / 100 crates)
        // Only eligible if >100 crates is made in a session.
        tiers: [
            {
                name: '',
                condition: (session, _) =>
                    session.crate_crafted >= 100 &&
                    session.time_spent / (session.crate_crafted / 100) <= 1440,
                deco_text: '',
            },
            {
                name: '',
                condition: (session, _) =>
                    session.crate_crafted >= 100 &&
                    session.time_spent / (session.crate_crafted / 100) <= 1200,
                deco_text: '',
            },
            {
                name: '',
                condition: (session, _) =>
                    session.crate_crafted >= 100 &&
                    session.time_spent / (session.crate_crafted / 100) <= 1080,
                deco_text: '',
            },
            {
                name: '',
                condition: (session, _) =>
                    session.crate_crafted >= 100 &&
                    session.time_spent / (session.crate_crafted / 100) <= 960,
                deco_text: 'How did you go that fast..?',
            },
        ],
    },
    // Weirdo's Achievements?
    {
        // BAYONETS.
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
                deco_text:
                    'Racoon would be proud.. though you used your own bmats right?',
            },
        ],
    },
];
