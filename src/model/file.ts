import type { BaseModel } from "./base";

export type FileModel = BaseModel & {
    model: string
    targetId: string
    path: string
    fileType: string
    hrefEdit: string
}