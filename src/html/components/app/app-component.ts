import { ComponentDefinition } from '@/html/types/components';
import LayoutComponent from './layout/layout';
import HeaderComponent from './header/header';
import BodyComponent from './body/body';
import SkillsAboutComponent from './pages/skills-about/skills-about';
import DialogComponent from './game-dialog/game-dialog';
import BattleComponent from './battle/battle';

/**
 * Components declaration
 */
export const componentDefinitions: ComponentDefinition[] = [
    {
        name: 'app-layout',
        component: LayoutComponent,
    },
    {
        name: 'app-header',
        component: HeaderComponent,
    },
    {
        name: 'app-body',
        component: BodyComponent,
    },
    {
        name: 'page-skills-about',
        component: SkillsAboutComponent,
    },
    {
        name: 'game-dialog',
        component: DialogComponent,
    },
    {
        name: 'app-battle',
        component: BattleComponent,
    },
];
