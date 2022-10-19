import { globalPreset } from '../preset';
import RemoteLoader from '@kne/remote-loader';

export const GlobalProvider = ({ children }) => {
    return <RemoteLoader module="Global@GlobalProvider" preset={globalPreset}>
        {children}
    </RemoteLoader>
}

export const GlobalModal = ({ children }) => {
    return <RemoteLoader module="Global@ModalGlobal" preset={globalPreset}>
        {children}
    </RemoteLoader>
}

const Global = ({ children }) => {
    return <RemoteLoader module="Global" preset={globalPreset}>
        {children}
    </RemoteLoader>
}

export default Global;