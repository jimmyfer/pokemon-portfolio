import { ComponentDefinition } from '@/html/types/components';
import MenuItemComponent from './menu-item/menu-item';

/**
 * Components declaration
 */
export const componentDefinitions: ComponentDefinition[] = [
    {
        name: 'ui-menu-item',
        component: MenuItemComponent,
    },
];
