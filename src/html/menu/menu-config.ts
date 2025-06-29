import ExperienceComponent from '../components/app/pages/experiences/experience';
import SkillsAboutComponent from '../components/app/pages/skills-about/skills-about';
import PokemonSwitchComponent from '../components/app/pokemon-switch/pokemon-switch';

export const MENU_CONFIG = [
    {
        itemName: 'POKéMON',
        component: PokemonSwitchComponent,
    },
    {
        itemName: 'BAG',
    },
    {
        itemName: 'ABOUT ME',
        component: SkillsAboutComponent,
    },
    {
        itemName: 'EXP',
        component: ExperienceComponent,
    },
    {
        itemName: 'SKILLS',
        component: SkillsAboutComponent,
    },
    {
        itemName: 'SERVICES',
    },
    {
        itemName: 'CONTACT',
    },
];
