import { COLORS } from '../../styles/colors';

interface FormInputProps {
    label: string;
    value?: string;
    onChange?: () => void;
}

export const FormInput = ({
    label,
    value = '',
    onChange = () => {},
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
