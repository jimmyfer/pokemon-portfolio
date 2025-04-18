import { componentDefinitions as appComponents } from '../components/app/app-component';

/**
 * Función para definir listas de componentes.
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

// Definimos los componentes UI
componentDefinition(appComponents);
