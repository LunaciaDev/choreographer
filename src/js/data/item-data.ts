import type { ItemData } from '../types/item-data';
import { ItemType } from '../types/item-type';

/**
 * Hey, you. Yes, you.
 *
 * You are probably editing this because something is missing/outdated?
 *
 * If there is a new queue type, add them in ItemType (follow the import above).
 *
 * Make sure that the cost is per crate, and the translation layer between LogiHub
 * and this is also updated... Some in-game name are simply way too long or provide
 * nothing of value.
 *
 * Also DO NOT modify the string ID of existing items!
 */

/**
 * Store all item data
 */
export const item_data: ItemData[] = [
    {
        name: 'Neville AT Rifle',
        alt_names: ['20 Neville Anti-Tank Rifle'],
        type: ItemType.HEAVY_ARM,
        cost: {
            bmat: 150,
            emat: 0,
            rmat: 0,
            hemat: 0,
        },
    },
    {
        name: '14.5mm',
        alt_names: ['14.5mm Ammo'],
        type: ItemType.HEAVY_ARM,
        cost: {
            bmat: 100,
            emat: 0,
            rmat: 0,
            hemat: 0,
        },
    },
    {
        name: 'Varsi AT Grenade',
        alt_names: ['B2 Varsi Anti-Tank Grenade'],
        type: ItemType.HEAVY_ARM,
        cost: {
            bmat: 95,
            emat: 125,
            rmat: 0,
            hemat: 0,
        },
    },
    {
        name: 'Mounted Bonesaw',
        alt_names: ['Mounted Bonesaw MK.3'],
        type: ItemType.HEAVY_ARM,
        cost: {
            bmat: 100,
            emat: 0,
            rmat: 5,
            hemat: 0,
        },
    },
    {
        name: 'Bonesaw Mk3',
        alt_names: ['Bonesaw MK.3', 'Bonesaw'],
        type: ItemType.HEAVY_ARM,
        cost: {
            bmat: 100,
            emat: 0,
            rmat: 25,
            hemat: 0,
        },
    },
    {
        name: 'ARC/RPG',
        alt_names: ['ARC RPG Ammo'],
        type: ItemType.HEAVY_ARM,
        cost: {
            bmat: 60,
            emat: 150,
            rmat: 0,
            hemat: 0,
        },
    },
    {
        name: "Willow's Bane Flamethrower",
        alt_names: ['Willow’s Bane Model 845', "Willow's Bane"],
        type: ItemType.HEAVY_ARM,
        cost: {
            bmat: 165,
            emat: 0,
            rmat: 30,
            hemat: 0,
        },
    },
    {
        name: 'Tremola Grenade',
        alt_names: ['Tremola Grenade GPb-1'],
        type: ItemType.HEAVY_ARM,
        cost: {
            bmat: 75,
            emat: 100,
            rmat: 0,
            hemat: 0,
        },
    },
    {
        name: 'Malone Ratcatcher',
        alt_names: ['Malone Ratcatcher MK.1'],
        type: ItemType.HEAVY_ARM,
        cost: {
            bmat: 100,
            emat: 0,
            rmat: 5,
            hemat: 0,
        },
    },
    {
        name: '30mm',
        alt_names: ['30mm Ammo'],
        type: ItemType.HEAVY_ARM,
        cost: {
            bmat: 80,
            emat: 40,
            rmat: 0,
            hemat: 0,
        },
    },
    {
        name: 'Cremari Mortar',
        type: ItemType.HEAVY_ARM,
        cost: {
            bmat: 100,
            emat: 0,
            rmat: 25,
            hemat: 0,
        },
    },
    {
        name: 'Flare Mortar Shell',
        type: ItemType.HEAVY_ARM,
        cost: {
            bmat: 60,
            emat: 15,
            rmat: 0,
            hemat: 0,
        },
    },
    {
        name: 'Shrapnel Mortar Shell',
        type: ItemType.HEAVY_ARM,
        cost: {
            bmat: 60,
            emat: 20,
            rmat: 0,
            hemat: 0,
        },
    },
    {
        name: 'HE Mortar Shell',
        alt_names: ['Mortar Shell'],
        type: ItemType.HEAVY_ARM,
        cost: {
            bmat: 60,
            emat: 70,
            rmat: 0,
            hemat: 0,
        },
    },
    {
        name: 'White Ash Flask Grenade',
        alt_names: ['BF5 White Ash Flask Grenade'],
        type: ItemType.HEAVY_ARM,
        cost: {
            bmat: 100,
            emat: 80,
            rmat: 0,
            hemat: 0,
        },
    },
    {
        name: 'Mammon 91-b',
        alt_names: ['Mammon 91 B'],
        type: ItemType.HEAVY_ARM,
        cost: {
            bmat: 100,
            emat: 20,
            rmat: 0,
            hemat: 0,
        },
    },
    {
        name: 'AT Sticky',
        alt_names: ['Anti-Tank Sticky Bomb', 'AT Sticky Grenade'],
        type: ItemType.HEAVY_ARM,
        cost: {
            bmat: 50,
            emat: 100,
            rmat: 0,
            hemat: 0,
        },
    },
    {
        name: 'Carnyx AT Launcher',
        alt_names: ['Carnyx Anti-Tank Rocket Launcher'],
        type: ItemType.HEAVY_ARM,
        cost: {
            bmat: 125,
            emat: 0,
            rmat: 15,
            hemat: 0,
        },
    },
    {
        name: 'Cutler Foebreaker',
        type: ItemType.HEAVY_ARM,
        cost: {
            bmat: 100,
            emat: 0,
            rmat: 5,
            hemat: 0,
        },
    },
    {
        name: 'Cutler Launcher',
        alt_names: ['Cutler Launcher 4'],
        type: ItemType.HEAVY_ARM,
        cost: {
            bmat: 100,
            emat: 0,
            rmat: 35,
            hemat: 0,
        },
    },
    {
        name: 'RPG',
        alt_names: ['RPG Shell'],
        type: ItemType.HEAVY_ARM,
        cost: {
            bmat: 60,
            emat: 90,
            rmat: 0,
            hemat: 0,
        },
    },
    {
        name: '150mm',
        alt_names: ['150mm Shell'],
        type: ItemType.HEAVY_SHELL,
        cost: {
            bmat: 120,
            emat: 0,
            rmat: 0,
            hemat: 60,
        },
    },
    {
        name: '120mm',
        alt_names: ['120mm Shell'],
        type: ItemType.HEAVY_SHELL,
        cost: {
            bmat: 120,
            emat: 0,
            rmat: 0,
            hemat: 10,
        },
    },
    {
        name: '250mm "Purity"',
        alt_names: ['250mm "Purity" Shell'],
        type: ItemType.HEAVY_SHELL,
        cost: {
            bmat: 120,
            emat: 0,
            rmat: 0,
            hemat: 100,
        },
    },
    {
        name: '68mm',
        alt_names: ['68mm Shell'],
        type: ItemType.HEAVY_SHELL,
        cost: {
            bmat: 120,
            emat: 240,
            rmat: 0,
            hemat: 0,
        },
    },
    {
        name: '40mm',
        alt_names: ['40mm Shell'],
        type: ItemType.HEAVY_SHELL,
        cost: {
            bmat: 160,
            emat: 240,
            rmat: 0,
            hemat: 0,
        },
    },
    {
        name: 'Booker Storm Rifle',
        alt_names: ['Booker Storm Rifle Model 838'],
        type: ItemType.LIGHT_ARM,
        cost: {
            bmat: 0,
            emat: 0,
            rmat: 15,
            hemat: 0,
        },
    },
    {
        name: 'Aalto Storm Rifle',
        alt_names: ['Aalto Storm Rifle 24'],
        type: ItemType.LIGHT_ARM,
        cost: {
            bmat: 0,
            emat: 0,
            rmat: 15,
            hemat: 0,
        },
    },
    {
        name: '7.92mm',
        alt_names: ['7.92mm Ammo'],
        type: ItemType.LIGHT_ARM,
        cost: {
            bmat: 120,
            emat: 0,
            rmat: 0,
            hemat: 0,
        },
    },
    {
        name: 'Malone Mk2',
        alt_names: ['Malone MK.2', 'Malone Mk.2 HMG'],
        type: ItemType.LIGHT_ARM,
        cost: {
            bmat: 0,
            emat: 0,
            rmat: 25,
            hemat: 0,
        },
    },
    {
        name: 'Harpa Frag Grenade',
        alt_names: ['A3 Harpa Fragmentation Grenade', 'Harpa Grenade'],
        type: ItemType.LIGHT_ARM,
        cost: {
            bmat: 100,
            emat: 40,
            rmat: 0,
            hemat: 0,
        },
    },
    {
        name: 'Cascadier',
        alt_names: ['Cascadier 873'],
        type: ItemType.LIGHT_ARM,
        cost: {
            bmat: 60,
            emat: 0,
            rmat: 0,
            hemat: 0,
        },
    },
    {
        name: '8mm',
        alt_names: ['8mm Ammo'],
        type: ItemType.LIGHT_ARM,
        cost: {
            bmat: 40,
            emat: 0,
            rmat: 0,
            hemat: 0,
        },
    },
    {
        name: 'Cometa Revolver',
        alt_names: ['Cometa T2-9'],
        type: ItemType.LIGHT_ARM,
        cost: {
            bmat: 60,
            emat: 0,
            rmat: 0,
            hemat: 0,
        },
    },
    {
        name: 'The Hangman',
        alt_names: ['The Hangman 757', 'Hangman'],
        type: ItemType.LIGHT_ARM,
        cost: {
            bmat: 125,
            emat: 0,
            rmat: 0,
            hemat: 0,
        },
    },
    {
        name: '.44',
        alt_names: ['.44 Ammo'],
        type: ItemType.LIGHT_ARM,
        cost: {
            bmat: 40,
            emat: 0,
            rmat: 0,
            hemat: 0,
        },
    },
    {
        name: 'Sampo Auto-Rifle',
        alt_names: ['Sampo Auto-Rifle 77', 'Sampo Autorifle'],
        type: ItemType.LIGHT_ARM,
        cost: {
            bmat: 125,
            emat: 0,
            rmat: 0,
            hemat: 0,
        },
    },
    {
        name: 'Blakerow Rifle',
        alt_names: ['Blakerow 871'],
        type: ItemType.LIGHT_ARM,
        cost: {
            bmat: 140,
            emat: 0,
            rmat: 0,
            hemat: 0,
        },
    },
    {
        name: 'Clancy Cinder',
        alt_names: ['Clancy Cinder M3', 'Clancy Cinder LR'],
        type: ItemType.LIGHT_ARM,
        cost: {
            bmat: 130,
            emat: 0,
            rmat: 0,
            hemat: 0,
        },
    },
    {
        name: 'Hawthorne',
        alt_names: ['No.2B Hawthorne'],
        type: ItemType.LIGHT_ARM,
        cost: {
            bmat: 70,
            emat: 0,
            rmat: 0,
            hemat: 0,
        },
    },
    {
        name: 'Loughcaster',
        alt_names: ['No.2 Loughcaster'],
        type: ItemType.LIGHT_ARM,
        cost: {
            bmat: 100,
            emat: 0,
            rmat: 0,
            hemat: 0,
        },
    },
    {
        name: 'Clancy-Raca Sniper',
        alt_names: ['Clancy-Raca M4'],
        type: ItemType.LIGHT_ARM,
        cost: {
            bmat: 250,
            emat: 0,
            rmat: 25,
            hemat: 0,
        },
    },
    {
        name: '7.62mm',
        alt_names: ['7.62mm Ammo'],
        type: ItemType.LIGHT_ARM,
        cost: {
            bmat: 80,
            emat: 0,
            rmat: 0,
            hemat: 0,
        },
    },
    {
        name: 'Buckshot',
        alt_names: ['Buckshot Ammo'],
        type: ItemType.LIGHT_ARM,
        cost: {
            bmat: 80,
            emat: 0,
            rmat: 0,
            hemat: 0,
        },
    },
    {
        name: 'Liar SMG',
        // ???? why the odd quote
        alt_names: ['No.1 “The Liar” Submachinegun'],
        type: ItemType.LIGHT_ARM,
        cost: {
            bmat: 120,
            emat: 0,
            rmat: 0,
            hemat: 0,
        },
    },
    {
        name: 'Fiddler SMG',
        alt_names: ['Fiddler Submachine Gun Model 868'],
        type: ItemType.LIGHT_ARM,
        cost: {
            bmat: 120,
            emat: 0,
            rmat: 0,
            hemat: 0,
        },
    },
    {
        name: '9mm',
        alt_names: ['9mm Ammo'],
        type: ItemType.LIGHT_ARM,
        cost: {
            bmat: 80,
            emat: 0,
            rmat: 0,
            hemat: 0,
        },
    },
    {
        name: 'Smoke Grenade',
        alt_names: ['PT-815 Smoke Grenade'],
        type: ItemType.LIGHT_ARM,
        cost: {
            bmat: 80,
            emat: 0,
            rmat: 0,
            hemat: 0,
        },
    },
    {
        name: 'Green Ash Grenade',
        type: ItemType.LIGHT_ARM,
        cost: {
            bmat: 140,
            emat: 0,
            rmat: 0,
            hemat: 0,
        },
    },
    {
        name: '12.7mm',
        alt_names: ['12.7mm Ammo'],
        type: ItemType.LIGHT_ARM,
        cost: {
            bmat: 100,
            emat: 0,
            rmat: 0,
            hemat: 0,
        },
    },
    {
        name: 'Pillory Scattergun',
        alt_names: ['No.4 The Pillory Scattergun'],
        type: ItemType.LIGHT_ARM,
        cost: {
            bmat: 80,
            emat: 0,
            rmat: 0,
            hemat: 0,
        },
    },
    {
        name: 'Bandages',
        type: ItemType.MEDICAL,
        cost: {
            bmat: 80,
            emat: 0,
            rmat: 0,
            hemat: 0,
        },
    },
    {
        name: 'First Aid Kit',
        type: ItemType.MEDICAL,
        cost: {
            bmat: 60,
            emat: 0,
            rmat: 0,
            hemat: 0,
        },
    },
    {
        name: 'Trauma Kit',
        type: ItemType.MEDICAL,
        cost: {
            bmat: 80,
            emat: 0,
            rmat: 0,
            hemat: 0,
        },
    },
    {
        name: 'Blood Plasma',
        type: ItemType.MEDICAL,
        cost: {
            bmat: 80,
            emat: 0,
            rmat: 0,
            hemat: 0,
        },
    },
    {
        name: 'Soldier Supplies',
        type: ItemType.MEDICAL,
        cost: {
            bmat: 80,
            emat: 0,
            rmat: 0,
            hemat: 0,
        },
    },
    {
        name: 'Specialist (Heavy)',
        // here too??
        alt_names: ['Specialist’s Overcoat', "Specialist's Overcoat"],
        type: ItemType.UNIFORM,
        cost: {
            bmat: 100,
            emat: 0,
            rmat: 0,
            hemat: 0,
        },
    },
    {
        name: 'Gunner (Knight)',
        // mannnnn
        alt_names: ['Gunner’s Breastplate', "Gunner's Breastplate"],
        type: ItemType.UNIFORM,
        cost: {
            bmat: 100,
            emat: 0,
            rmat: 0,
            hemat: 0,
        },
    },
    {
        name: 'Sapper (Engineer)',
        alt_names: ['Sapper Gear'],
        type: ItemType.UNIFORM,
        cost: {
            bmat: 100,
            emat: 0,
            rmat: 0,
            hemat: 0,
        },
    },
    {
        name: 'Physician (Medic)',
        alt_names: ['Physician’s Jacket', "Physician's Jacket"],
        type: ItemType.UNIFORM,
        cost: {
            bmat: 100,
            emat: 0,
            rmat: 0,
            hemat: 0,
        },
    },
    {
        name: 'Officer (Larp)',
        alt_names: ['Officer’s Regalia', "Officer's Regalia"],
        type: ItemType.UNIFORM,
        cost: {
            bmat: 100,
            emat: 0,
            rmat: 0,
            hemat: 0,
        },
    },
    {
        name: 'Outrider (Scout)',
        alt_names: ['Outrider’s Mantle', "Outrider's Mantle"],
        type: ItemType.UNIFORM,
        cost: {
            bmat: 100,
            emat: 0,
            rmat: 0,
            hemat: 0,
        },
    },
    {
        name: 'Parka',
        alt_names: ['Caoivish Parka'],
        type: ItemType.UNIFORM,
        cost: {
            bmat: 100,
            emat: 0,
            rmat: 0,
            hemat: 0,
        },
    },
    {
        name: 'Boiler Suit (Tanker)',
        alt_names: ['Padded Boiler Suit'],
        type: ItemType.UNIFORM,
        cost: {
            bmat: 100,
            emat: 0,
            rmat: 0,
            hemat: 0,
        },
    },
    {
        name: "Gentleman's Peacoat (Sailor)",
        alt_names: ['Gentleman’s Peacoat', "Gentleman's Peacoat"],
        type: ItemType.UNIFORM,
        cost: {
            bmat: 100,
            emat: 0,
            rmat: 0,
            hemat: 0,
        },
    },
    {
        name: 'Barbed Wire',
        type: ItemType.UTILITIES,
        cost: {
            bmat: 15,
            emat: 0,
            rmat: 0,
            hemat: 0,
        },
    },
    {
        name: 'Binoculars',
        type: ItemType.UTILITIES,
        cost: {
            bmat: 75,
            emat: 0,
            rmat: 0,
            hemat: 0,
        },
    },
    {
        name: 'Havoc Charge',
        type: ItemType.UTILITIES,
        cost: {
            bmat: 75,
            emat: 0,
            rmat: 0,
            hemat: 40,
        },
    },
    {
        name: "Willow's Bane Ammo",
        type: ItemType.UTILITIES,
        cost: {
            bmat: 135,
            emat: 0,
            rmat: 0,
            hemat: 20,
        },
    },
    {
        name: 'Listening Kit',
        type: ItemType.UTILITIES,
        cost: {
            bmat: 150,
            emat: 0,
            rmat: 0,
            hemat: 0,
        },
    },
    {
        name: 'Wind Sock',
        type: ItemType.UTILITIES,
        cost: {
            bmat: 150,
            emat: 0,
            rmat: 0,
            hemat: 0,
        },
    },
    {
        name: 'Metal Beam',
        type: ItemType.UTILITIES,
        cost: {
            bmat: 25,
            emat: 0,
            rmat: 0,
            hemat: 0,
        },
    },
    {
        name: 'Radio Backpack',
        type: ItemType.UTILITIES,
        cost: {
            bmat: 150,
            emat: 0,
            rmat: 0,
            hemat: 0,
        },
    },
    {
        name: 'Sandbag',
        type: ItemType.UTILITIES,
        cost: {
            bmat: 15,
            emat: 0,
            rmat: 0,
            hemat: 0,
        },
    },
    {
        name: 'Havoc Charge Detonator',
        type: ItemType.UTILITIES,
        cost: {
            bmat: 75,
            emat: 0,
            rmat: 0,
            hemat: 20,
        },
    },
    {
        name: 'Alligator Charge',
        type: ItemType.UTILITIES,
        cost: {
            bmat: 100,
            emat: 80,
            rmat: 0,
            hemat: 0,
        },
    },
    {
        name: 'Shovel',
        type: ItemType.UTILITIES,
        cost: {
            bmat: 200,
            emat: 0,
            rmat: 0,
            hemat: 0,
        },
    },
    {
        name: 'Sledgehammer',
        alt_names: ['Sledge Hammer'],
        type: ItemType.UTILITIES,
        cost: {
            bmat: 200,
            emat: 0,
            rmat: 0,
            hemat: 0,
        },
    },
    {
        name: 'Tripod',
        type: ItemType.UTILITIES,
        cost: {
            bmat: 100,
            emat: 0,
            rmat: 0,
            hemat: 0,
        },
    },
    {
        name: 'Wrench',
        type: ItemType.UTILITIES,
        cost: {
            bmat: 75,
            emat: 0,
            rmat: 0,
            hemat: 0,
        },
    },
    {
        name: 'Water Bucket',
        type: ItemType.UTILITIES,
        cost: {
            bmat: 80,
            emat: 0,
            rmat: 0,
            hemat: 0,
        },
    },
    {
        name: 'Buckhorn CCQ-18',
        alt_names: ['Buckhorn CCQ 18'],
        type: ItemType.UTILITIES,
        cost: {
            bmat: 40,
            emat: 0,
            rmat: 0,
            hemat: 0,
        },
    },
    {
        name: 'Falias Raiding Club',
        type: ItemType.UTILITIES,
        cost: {
            bmat: 200,
            emat: 0,
            rmat: 0,
            hemat: 0,
        },
    },
    {
        name: 'Gas Mask',
        type: ItemType.UTILITIES,
        cost: {
            bmat: 160,
            emat: 0,
            rmat: 0,
            hemat: 0,
        },
    },
    {
        name: 'Gas Mask Filter',
        type: ItemType.UTILITIES,
        cost: {
            bmat: 100,
            emat: 0,
            rmat: 0,
            hemat: 0,
        },
    },
    {
        name: 'The Ospreay',
        alt_names: ['Ospreay'],
        type: ItemType.UTILITIES,
        cost: {
            bmat: 85,
            emat: 0,
            rmat: 10,
            hemat: 0,
        },
    },
    {
        name: 'Radio',
        type: ItemType.UTILITIES,
        cost: {
            bmat: 75,
            emat: 0,
            rmat: 0,
            hemat: 0,
        },
    },
    {
        name: 'AP/RPG',
        alt_names: ['AP RPG Ammo'],
        type: ItemType.HEAVY_ARM,
        cost: {
            bmat: 60,
            emat: 150,
            rmat: 0,
            hemat: 0,
        },
    },
    {
        name: 'Shatter Missle',
        type: ItemType.HEAVY_SHELL,
        cost: {
            bmat: 250,
            emat: 0,
            rmat: 0,
            hemat: 250,
        },
    },
    {
        name: '250mm "Fury" Shell',
        type: ItemType.HEAVY_SHELL,
        cost: {
            bmat: 250,
            emat: 0,
            rmat: 0,
            hemat: 200,
        },
    },
    {
        name: '20mm',
        alt_names: ['20mm Ammo'],
        type: ItemType.HEAVY_SHELL,
        cost: {
            bmat: 120,
            emat: 0,
            rmat: 0,
            hemat: 0,
        },
    },
    {
        name: 'E681-B Hullbreaker Mine',
        type: ItemType.HEAVY_SHELL,
        cost: {
            bmat: 120,
            emat: 35,
            rmat: 0,
            hemat: 0,
        },
    },
    {
        name: 'Liaison Transmitter',
        type: ItemType.UTILITIES,
        cost: {
            bmat: 75,
            emat: 0,
            rmat: 0,
            hemat: 0,
        },
    },
    {
        name: 'Anti-Aircraft Shell',
        type: ItemType.HEAVY_SHELL,
        cost: {
            bmat: 100,
            emat: 0,
            rmat: 0,
            hemat: 15,
        },
    },
];
