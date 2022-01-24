import {e2e} from "@grafana/e2e";
import {selectors} from '../../src/test/selectors';

const e2eSelectors = e2e.getSelectors(selectors.components);

type ADXConfig = {
    secureJsonData: {
        clientSecret: string;
    };
    jsonData: {
        clusterUrl: string;
        tenantId: string;
        clientId: string;
        // tlsAuth: boolean;
        // tlsAuthWithCACert: boolean;
        // defaultDatabase: string;
    };
};

type ADXProvision = {
    datasources: ADXConfig[];
};

e2e.scenario({
    describeName: 'Smoke tests',
    itName: 'Login',
    scenario: () => {
        e2e()
            .readProvisions(['datasources/adx.yaml'])
            .then((ADXProvisions: ADXProvision[]) => {
                const datasource = ADXProvisions[0].datasources[0];

                e2e.flows.addDataSource({
                    name: 'e2e-azure-data-explorer-datasource',
                    checkHealth: true,
                    expectedAlertMessage: 'hello hello',
                    form: () => {
                        e2eSelectors.ConfigEditor.AzureCloud.input().type('Azure')
                        e2eSelectors.ConfigEditor.ClusterURL.input().type(datasource.jsonData.clusterUrl);
                        e2e().logToConsole('gregor')
                    },
                    type:'Azure Data Explorer Datasource'
                })
            });


    }
});


// e2e.scenario({
//     describeName:'Imports a dashboard',
//     itName: 'Ensure you can import a number of json test dashboards from a specific test directory',
//     addScenarioDataSource: true,
//     addScenarioDashBoard: true,
//     scenario: () => {
//         e2e.flows.importDashboards('/cypress/dashboards', 1000)
//     }
// })
