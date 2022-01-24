import {E2ESelectors} from '@grafana/e2e-selectors';

export const Components = {
    ConfigEditor: {
        AzureCloud: {
            input: 'Azure cloud',
        },
        ClusterURL: {
            input: 'Cluster URL'
        }
    },
};

export const selectors: { components: E2ESelectors<typeof Components> } = {
    components: Components,
};
