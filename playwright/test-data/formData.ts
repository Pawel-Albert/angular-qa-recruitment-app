import { HERO_POWER } from '../page-objects/formPage';

type FormData = {
    name: string;
    alterEgo: string;
    heroPower?: HERO_POWER;
};

export const correctFormData: FormData = {
    name: 'Test Name',
    alterEgo: 'Test Alter Ego',
    heroPower: HERO_POWER.SUPER_HOT
};

export const incorrectFormData: FormData[] = [
    {
        name: '   ',
        alterEgo: 'Test Alter Ego',
        heroPower: HERO_POWER.REALLY_SMART
    },
    {
        name: 'Test Name',
        alterEgo: '   ',
        heroPower: HERO_POWER.REALLY_SMART
    },
    {
        name: 'Test Name',
        alterEgo: 'Test Alter Ego'
    }
];
