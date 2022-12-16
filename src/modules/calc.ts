export enum InputType {
    Number = 'number',
    Operator = 'operator',
}

export enum OperatorType {
    Add = '+',
    Subtract = '-',
    Multiply = '*',
    Divide = '/',
    Equals = '=',
}

export type CalcInput = 
    { type: InputType.Number, value: number} |
    { type: InputType.Operator, operator: OperatorType, value?: number };

export type CalcState = {
    value: number;
}

export type CalcOperation = {
    operator: OperatorType;
    value: number;
}

type CalcOperationsBuilder = {
    operations: CalcOperation[];
    working: CalcOperation;
}

const getCalcOperationsBuilder = (inputs: Array<CalcInput>): CalcOperationsBuilder => {

    return inputs.reduce<CalcOperationsBuilder>(
        (builder, input) => {

        switch (input.type) {
            case InputType.Number:
                const previousValue = builder.working?.value || 0;
                const newValue = previousValue * 10 + input.value;
                return { ...builder, working: { ...builder.working, value: newValue } };
            case InputType.Operator:
                if (input.operator === OperatorType.Equals) {
                    return {
                        operations: [...builder.operations, builder.working, { operator: input.operator, value: 0 }],
                        working: { operator: OperatorType.Add, value: 0 }
                    }
                }
                return {
                    operations: [...builder.operations, builder.working],
                    working: { operator: input.operator, value: 0 }
                };

            default:
                return builder;
        }
    }, { operations: [], working: { operator: OperatorType.Add, value: 0 } });
};

const getState = (inputs: Array<CalcInput>): CalcState => {
    const builder = getCalcOperationsBuilder(inputs);
    const { operations } = builder;

    const lastOperation = operations.length ? operations[operations.length - 1] : null;
    
    if (!lastOperation) {
        return { value: builder.working.value };
    }

    const lastInput = inputs.length ? inputs[inputs.length - 1] : null;
    const total = getTotal(operations);

    switch (lastOperation.operator) {
        
        case OperatorType.Equals:
        return { value: total };

        default:
        const lastValue = builder.working.value;
        return { value: lastInput && lastInput.type === InputType.Number ? lastValue : total }; 
    }
}

const getTotal = (operations: Array<CalcOperation>): number => {
    return operations.reduce((sum, operation) => {
        switch (operation.operator) {
            case OperatorType.Add:
                return sum + operation.value;
            case OperatorType.Subtract:
                return sum - operation.value;
            case OperatorType.Multiply:
                return sum * operation.value;
            case OperatorType.Divide:
                // throw new Error('Cannot divide by zero');
                if (operation.value === 0) {
                    return NaN;
                }
                return sum / operation.value;
            case OperatorType.Equals:
                return sum;
            
            default:
                return sum;
        }
    }, 0);
}

const Calc = {
    getCalcOperationsBuilder,
    getState
}

export default Calc;