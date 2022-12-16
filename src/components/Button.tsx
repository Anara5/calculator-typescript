import React from "react";

export enum ButtonType {
    Operator,
    Number,
    Clear,
}

type ButtonProps = React.HTMLProps<HTMLButtonElement> & {
    buttonType?: ButtonType;
    label: string;
    position?: [x: number, y: number];
    width?: number;
};

const Button: React.FC<ButtonProps> = ({ buttonType = ButtonType.Number, label, position, width, onClick }) => {

    const styles: React.CSSProperties = {};
    if (position) {
        styles['gridColumnStart'] = position[0] + 1;
        styles['gridRowStart'] = position[1] + 1;
    }
    if (width && position) {
        styles['gridColumnEnd'] = position[0] + width + 1;
    }
    if (buttonType === ButtonType.Operator) {
        styles['color'] = 'black';
        styles['backgroundColor'] = '#ff9500';
    }
    if (buttonType === ButtonType.Clear) {
        styles['backgroundColor'] = 'gray';
    }

    return (
        <button className='bg-[#2e2e2e] border-none rounded-md text-white font-semibold' 
            style={styles}
            onClick={onClick}>
            {label}
        </button>
    );
};

export default Button;