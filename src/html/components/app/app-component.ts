import { ComponentDefinition } from '@/html/types/components';
import LayoutComponent from './layout/layout';
import HeaderComponent from './header/header';

/**
 * Declaración de componentes
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
];
