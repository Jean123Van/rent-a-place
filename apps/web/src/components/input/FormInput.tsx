import { COLORS } from '../../styles/colors';

interface FormInputProps {
    label: string;
    value?: string;
    type?: React.InputHTMLAttributes<HTMLInputElement>['type'];
    onChange?: () => void;
}

export const FormInput = ({
    label,
    value = '',
    onChange = () => {},
    type = 'text',
}: FormInputProps) => {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                width: '100%',
                marginBottom: '10px',
            }}
        >
            <label htmlFor={label}>{label}</label>
            <input
                type={type}
                onChange={onChange}
                placeholder={label}
                id={label}
                value={value}
                style={{
                    border: 'none',
                    borderBottom: `2px solid ${COLORS.skintone}`,
                    width: '100%',
                    padding: '6px',
                    outline: 'none',
                }}
            />
        </div>
    );
};
