import { UiComponent } from "@wxn0brp/flanker-ui";
import { adapterBodyView } from "./adapterBody/adapterBody.view";
import { adaptersListView } from "./adaptersList/adaptersList.view";
import { adapterMetaView } from "./adapterBody/adapterMeta.view";
import { adapterResultView } from "./adapterBody/adapterResult.view";
import { queryHistoryView } from "./queryHistory/queryHistory.view";
import { serverConfigView } from "./serverConfig/serverConfig.view";

const components: UiComponent[] = [
    serverConfigView,
    adaptersListView,
    adapterBodyView,
    adapterMetaView,
    adapterResultView,
    queryHistoryView,
];

components.forEach((component) => component.mount());
