import { COLORS } from '../../styles/colors';

interface FormInputProps {
    label: string;
    value?: string;
    isPassword?: boolean;
    onChange?: () => void;
}

export const FormInput = ({
    label,
    value = '',
    onChange = () => {},
    isPassword,
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
                type={isPassword ? 'password' : 'text'}
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
