import { ConfigScreen } from './core/config-screen';
import '../style.sass';
import { LogihubImporter } from './core/logihub-import';
import { ResultScreen } from './core/result-screen';
import { StatScreen } from './core/stat-screen';
import { DomRegistry } from './core/dom-registry';
import { ManuScreen } from './core/manu-screen';

document.addEventListener('DOMContentLoaded', () => {
    DomRegistry.init();
    ConfigScreen.init();
    LogihubImporter.init();
    ResultScreen.init();
    StatScreen.init();
    ManuScreen.init();

    StatScreen.show();
});
