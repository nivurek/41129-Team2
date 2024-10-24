import { updateVersion } from 'actions/versionActions';
import { getUserById } from 'actions/userActions';

export async function updateVersionHelper(pathProps, additionalProps) {
    
    const payload = {
        userId: pathProps.userId,
        projectId: pathProps.projectId,
        pageId: pathProps.pageId,
        versionId: pathProps.versionId,
        ...additionalProps
    }

    await updateVersion(payload);
    const updatedData = await getUserById(pathProps.userId);
    return updatedData
}