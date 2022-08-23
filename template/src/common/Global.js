import { globalPreset } from '../preset';
import RemoteLoader from '@kne/remote-loader';

export const GlobalProvider = ({ children }) => {
    return <RemoteLoader module="Global@GlobalProvider" preset={globalPreset}>
        {children}
    </RemoteLoader>
}

const Global = ({ children }) => {
    return <RemoteLoader module="Global" preset={globalPreset}>
        {children}
    </RemoteLoader>
}

export default Global;