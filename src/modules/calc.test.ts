import Calc, {CalcOperation, CalcInput, InputType, OperatorType} from "./calc";

test('generates operations', () => {
    const inputs: Array<CalcInput> = [
        { type: InputType.Number, value: 1 },
        { type: InputType.Number, value: 2 },
        { type: InputType.Operator, operator: OperatorType.Add },
        { type: InputType.Number, value: 3 },
        { type: InputType.Operator, operator: OperatorType.Equals },
    ];

    const operations: Array<CalcOperation> = [
        { operator: OperatorType.Add, value: 12 },
        { operator: OperatorType.Add, value: 3 },
        { operator: OperatorType.Equals, value: 0 },
    ];
    
    const state = Calc.getCalcOperationsBuilder(inputs).operations;
    expect(state).toEqual(operations);
});

test('has displayed 0 with no inputs', () => {
    const inputs: Array<CalcInput> = [];
    const state = Calc.getState(inputs);
    expect(state).toEqual({ value: 0 });
});

test('display value upon first numerical input', () => {
    const inputs: Array<CalcInput> = [
        { type: InputType.Number, value: 1 },
    ]
    const state = Calc.getState(inputs);
    expect(state.value).toEqual(1);
});

test('keeps the first value upon operator input', () => {
    const inputs: Array<CalcInput> = [
        { type: InputType.Number, value: 1 },
        { type: InputType.Number, value: 2 },
        { type: InputType.Operator, operator: OperatorType.Add },
    ]
    const state = Calc.getState(inputs);
    expect(state.value).toEqual(12);
});

test('derives display value upon new numerical input', () => {
    const inputs: Array<CalcInput> = [
        { type: InputType.Number, value: 1 },
        { type: InputType.Number, value: 2 },
        { type: InputType.Operator, operator: OperatorType.Add },
        { type: InputType.Number, value: 3 },
    ]
    const state = Calc.getState(inputs);
    expect(state.value).toEqual(3);
});

test('final state with addition', () => {
    const inputs: Array<CalcInput> = [
        { type: InputType.Number, value: 1 },
        { type: InputType.Number, value: 2 },
        { type: InputType.Operator, operator: OperatorType.Add },
        { type: InputType.Number, value: 3 },
        { type: InputType.Operator, operator: OperatorType.Equals },
    ]
    const state = Calc.getState(inputs);
    expect(state).toEqual({ value: 15 });
});

test('final state with addition and substraction', () => {
    const inputs: Array<CalcInput> = [
        { type: InputType.Number, value: 1 },
        { type: InputType.Number, value: 2 },
        { type: InputType.Operator, operator: OperatorType.Add },
        { type: InputType.Number, value: 3 },
        { type: InputType.Operator, operator: OperatorType.Subtract },
        { type: InputType.Number, value: 4 },
        { type: InputType.Operator, operator: OperatorType.Equals },
    ]
    const state = Calc.getState(inputs);
    expect(state).toEqual({ value: 11 });
});

test('final state with division', () => {
    const inputs: Array<CalcInput> = [
        { type: InputType.Number, value: 1 },
        { type: InputType.Number, value: 2 },
        { type: InputType.Operator, operator: OperatorType.Divide },
        { type: InputType.Number, value: 3 },
        { type: InputType.Operator, operator: OperatorType.Equals },
        ]
    const state = Calc.getState(inputs);
    expect(state).toEqual({ value: 4 });
});

test('no result display when division by 0', () => {
    const inputs: Array<CalcInput> = [
        { type: InputType.Number, value: 1 },
        { type: InputType.Number, value: 2 },
        { type: InputType.Operator, operator: OperatorType.Divide },
        { type: InputType.Number, value: 0 },
        { type: InputType.Operator, operator: OperatorType.Equals },
        ]
    const state = Calc.getState(inputs);
    expect(state).toEqual({ value: NaN });
});
