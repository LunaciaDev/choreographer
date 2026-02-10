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
        logihub_name: '20 Neville Anti-Tank Rifle',
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
        logihub_name: 'B2 Varsi Anti-Tank Grenade',
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
        logihub_name: 'Mounted Bonesaw MK.3',
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
        logihub_name: 'Bonesaw MK.3',
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
        logihub_name: 'Willow’s Bane Model 845',
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
        logihub_name: 'Tremola Grenade GPb-1',
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
        logihub_name: 'Malone Ratcatcher MK.1',
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
        logihub_name: 'Mortar Shell',
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
        logihub_name: 'BF5 White Ash Flask Grenade',
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
        logihub_name: 'Anti-Tank Sticky Bomb',
        type: ItemType.HEAVY_ARM,
        cost: {
            bmat: 50,
            emat: 100,
            rmat: 0,
            hemat: 0,
        },
    },
    {
        name: 'Carnyx AT Rocket Launcher',
        logihub_name: 'Carnyx Anti-Tank Rocket Launcher',
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
        logihub_name: 'Cutler Launcher 4',
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
        logihub_name: '250mm "Purity" Shell',
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
        logihub_name: 'Booker Storm Rifle Model 838',
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
        logihub_name: 'Aalto Storm Rifle 24',
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
        logihub_name: 'Malone MK.2',
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
        logihub_name: 'A3 Harpa Fragmentation Grenade',
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
        logihub_name: 'Cascadier 873',
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
        logihub_name: 'Cometa T2-9',
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
        logihub_name: 'The Hangman 757',
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
        logihub_name: 'Sampo Auto-Rifle 77',
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
        logihub_name: 'Blakerow 871',
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
        logihub_name: 'Clancy Cinder M3',
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
        logihub_name: 'No.2B Hawthorne',
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
        logihub_name: 'No.2 Loughcaster',
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
        logihub_name: 'Clancy-Raca M4',
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
        logihub_name: 'No.1 “The Liar” Submachinegun',
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
        logihub_name: 'Fiddler Submachine Gun Model 868',
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
        logihub_name: 'PT-815 Smoke Grenade',
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
        logihub_name: 'No.4 The Pillory Scattergun',
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
        logihub_name: 'Specialist’s Overcoat',
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
        logihub_name: 'Gunner’s Breastplate',
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
        logihub_name: 'Sapper Gear',
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
        logihub_name: 'Physician’s Jacket',
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
        logihub_name: 'Officer’s Regalia',
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
        logihub_name: 'Outrider’s Mantle',
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
        logihub_name: 'Caoivish Parka',
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
        logihub_name: 'Padded Boiler Suit',
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
        logihub_name: 'Gentleman’s Peacoat',
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
        logihub_name: 'Sledge Hammer',
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
        type: ItemType.HEAVY_ARM,
        cost: {
            bmat: 250,
            emat: 0,
            rmat: 0,
            hemat: 250,
        },
    },
    {
        name: '250mm "Fury" Shell',
        type: ItemType.HEAVY_ARM,
        cost: {
            bmat: 250,
            emat: 0,
            rmat: 0,
            hemat: 200,
        },
    },
    {
        name: '20mm',
        type: ItemType.HEAVY_ARM,
        cost: {
            bmat: 120,
            emat: 0,
            rmat: 0,
            hemat: 0,
        },
    },
    {
        name: 'E681-B Hullbreaker Mine',
        type: ItemType.HEAVY_ARM,
        cost: {
            bmat: 120,
            emat: 35,
            rmat: 0,
            hemat: 0,
        },
    },
    {
        name: 'Liaison Transmitter',
        type: ItemType.HEAVY_ARM,
        cost: {
            bmat: 75,
            emat: 0,
            rmat: 0,
            hemat: 0,
        },
    },
];
