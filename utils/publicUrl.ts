/**
 * @param path Path to the asset you want to get from public folder
 */
export const publicUrl = (path: string) => process.env.NEXT_PUBLIC_BASE_URL + '/' + path;
