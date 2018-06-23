import { Storage } from "aws-amplify";

export async function s3Upload(file) {
    const filename = `${file.name}-${Date.now()}`;

    const stored = await Storage.vault.put(filename, file, {
        contentType: file.type
    });
    return stored.key;
}

export async function s3Remove(filename) {
    await Storage.vault.remove(filename);
}