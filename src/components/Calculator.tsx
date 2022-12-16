import React, {useState} from 'react';
import Calc, { CalcInput, InputType, OperatorType } from '../modules/calc';
import Button, {ButtonType} from './Button';

const Calculator: React.FC = ({}) => {

    const [inputs, setInputs] = useState<Array<CalcInput>>([]);
    const state = Calc.getState(inputs);

    const handleNumber = (value: number) => () => {
        setInputs([...inputs, {type: InputType.Number, value}]);
    };

    const handleOperator = (operator: OperatorType) => () => {
        setInputs([...inputs, {type: InputType.Operator, operator}]);
    };

    const handleAllClear = () => setInputs([]);

    const handleDel = () => setInputs(inputs.slice(0, -1));

    // set negative or positive number
    const handlePlusMinus = () => {
        
    };

    // set dot for decimal number
    const handleDot = () => {
        
    };


    return (
        <div className="h-[100vh] text-center bg-slate-300">
            <header className="h-[10vh] bg-[#282c34] text-white grid content-center">
                <p className="text-xl">Calculator Simple</p>
            </header>
    
            <div className="h-[90vh] grid place-items-center">
                <div className="w-[300px] h-[460px] bg-[#000000] rounded-lg shadow-lg">
                    <div className="h-[60px] grid content-center rounded-t-lg p-3 mt-10">
                        <p className="h-[60px] grid content-center bg-white text-3xl font-normal rounded-md text-end p-2
                            overflow-hidden overflow-x-auto scrollbar-hide
                            "
                            id='no-scrollbar'>
                            {state.value}
                        </p>
                    </div>
                    <div className="h-[340px] grid grid-cols-4 grid-rows-6 gap-3 p-3
                    text-2xl">
                        <Button buttonType={ButtonType.Clear} label='AC' position={[0, 0]} width={2} onClick={handleAllClear} />
                        <Button buttonType={ButtonType.Clear} label='Del' position={[2, 0]} width={1} onClick={handleDel} />
                        <Button buttonType={ButtonType.Operator} label='+/-' position={[3, 0]} onClick={handlePlusMinus} />
                        <Button buttonType={ButtonType.Operator} label='/' position={[3, 1]} onClick={handleOperator(OperatorType.Divide)} />
                        <Button buttonType={ButtonType.Operator} label='*' position={[3, 2]} onClick={handleOperator(OperatorType.Multiply)} />
                        <Button buttonType={ButtonType.Operator} label='-' position={[3, 3]} onClick={handleOperator(OperatorType.Subtract)} />
                        <Button buttonType={ButtonType.Operator} label='+' position={[3, 4]} onClick={handleOperator(OperatorType.Add)} />
                        <Button label='9' position={[2, 1]} onClick={handleNumber(9)} />
                        <Button label='8' position={[1, 1]} onClick={handleNumber(8)} />
                        <Button label='7' position={[0, 1]} onClick={handleNumber(7)} />
                        <Button label='6' position={[2, 2]} onClick={handleNumber(6)} />
                        <Button label='5' position={[1, 2]} onClick={handleNumber(5)} />
                        <Button label='4' position={[0, 2]} onClick={handleNumber(4)} />
                        <Button label='3' position={[2, 3]} onClick={handleNumber(3)} />
                        <Button label='2' position={[1, 3]} onClick={handleNumber(2)} />
                        <Button label='1' position={[0, 3]} onClick={handleNumber(1)} />
                        <Button label='0' position={[0, 4]} width={2} onClick={handleNumber(0)} />
                        <Button label='.' position={[2, 4]} onClick={handleDot} />
                        <Button buttonType={ButtonType.Operator} label='=' position={[1, 5]} width={2} onClick={handleOperator(OperatorType.Equals)} />
                    </div>
                </div>
                
            </div>
        </div>
    );
};

export default Calculator;