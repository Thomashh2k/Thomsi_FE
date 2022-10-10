export enum InputType {
    text = 0,
    tel = 1,
    email = 2,
    checkbox = 3,
    file = 4,
    image = 5,
    password = 6,
    date = 7,
    time = 8,
    color = 9,
}

export interface inputPL {
    inputName: string
    inputLength: number
    notNullable: boolean
    delete: boolean
    new: boolean
    inputType: InputType
}
export interface customFormPL {
    formName: string,
    inputs: inputPL[],
}
