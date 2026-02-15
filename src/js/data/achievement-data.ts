import type { ManuData } from '../types/manu-data';
import type { UserData } from '../types/user-data';

type AchievementData = {
    tiers: AchievementTier[];
};

type AchievementTier = {
    name: string;
    condition: AchivementCondition;
    deco_text: string;
};

interface AchivementCondition {
    (session_data: ManuData, lifetime_data: UserData): boolean;
}

export const achievement_data: AchievementData[] = [
    // Lifetime Achivements Set
    {
        // Crate Manufactured
        tiers: [
            {
                name: 'Walking Cratastrophy',
                condition: (_session_data, lifetime_data) =>
                    lifetime_data.crate_crafted >= 200000,
                deco_text: 'Almost enough for a frontline operation.',
            },
        ],
    },
    {
        // Material Consumed
        tiers: [],
    },
    {
        // Time Spent
        tiers: [],
    },
    // Session Achievement Set
    {
        // Crate Manufactured
        tiers: [],
    },
    {
        // Material Consumed
        tiers: [],
    },
    {
        // Time Spent
        tiers: [],
    },
    {
        // Efficiency (time / 100 crates)
        // Only eligible if >100 crates is made in a session.
        tiers: [],
    },
    // Weirdo's Achievements?
    {
        // BAYONETS.
        tiers: [],
    },
];
