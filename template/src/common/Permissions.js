import RemoteLoader from '@kne/remote-loader';
import { useContext } from '../context';

export const PermissionsProvider = ({ children }) => {
    const { permissions } = useContext();
    return <RemoteLoader module="Permissions@PermissionsProvider" permissions={permissions || []}>
        {children}
    </RemoteLoader>
}

const Permissions = ({ type, request, children }) => {
    return <RemoteLoader module="Permissions" type={type} request={request}>
        {children}
    </RemoteLoader>
}

Permissions.defaultProps = {
    type: 'error',
    request: []
}

export default Permissions;