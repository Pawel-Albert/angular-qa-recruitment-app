export type StepperData = {
    name: string;
    address: string;
};

export const correctStepperData: StepperData = {
    name: 'John Doe',
    address: '123 Main St, Anytown, AN'
};

export const incorrectStepperData: StepperData[] = [
    {
        name: 'This name is way too long to be acceptable',
        address: '123 Main St, Anytown, AN'
    },
    {
        name: 'John Doe',
        address: '123 Main Street, Anytown, AN, This address is definitely way too long'
    },
    {
        name: '      ',
        address: '123 Main St, Anytown, AN'
    },
];
