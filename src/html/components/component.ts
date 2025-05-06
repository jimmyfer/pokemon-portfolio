import { componentDefinitions as appComponents } from '../components/app/app-component';
import { componentDefinitions as uiComponents } from '../components/ui/ui-component';

/**
 * Function to define list of components
 */
function componentDefinition(
    componentDefinitions: {
        name: string;
        component: CustomElementConstructor;
    }[]
) {
    componentDefinitions.forEach(({ name, component }) => {
        customElements.define(name, component);
    });
}

componentDefinition(appComponents);
componentDefinition(uiComponents);
