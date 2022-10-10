import { inputPL } from '@/payloads/customFormPL'

export interface customForm {
    id: string
    formName: string,
    inputs: inputPL[],
}
