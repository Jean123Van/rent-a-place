import { COLORS } from '../../styles/colors';

interface FormInputProps {
    label: string;
}

export const FormInput = ({ label }: FormInputProps) => {
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
                placeholder={label}
                id={label}
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
