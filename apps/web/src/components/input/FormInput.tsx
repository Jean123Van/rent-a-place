import { COLORS } from '../../styles/colors';
import { SmallNote } from '../Text/SmallNote';

interface FormInputProps {
    label: string;
    value?: string;
    type?: React.InputHTMLAttributes<HTMLInputElement>['type'];
    error?: string[];
    hint?: string;
    disabled?: boolean;
    onChange?: () => void;
}

export const FormInput = ({
    label,
    value = '',
    onChange = () => {},
    type = 'text',
    error,
    hint,
    disabled,
}: FormInputProps) => {
    const isError = (error?.length || 0) >= 1;

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
            <label htmlFor={label} style={{ color: isError ? 'red' : 'black' }}>
                {label}
            </label>

            <input
                disabled={disabled}
                type={type}
                onChange={onChange}
                placeholder={label}
                id={label}
                value={value}
                style={{
                    border: 'none',
                    borderBottom: isError
                        ? `2px solid red`
                        : `2px solid ${COLORS.skintone}`,
                    width: '100%',
                    padding: '6px',
                    outline: 'none',
                }}
            />
            {hint && !isError && <SmallNote>{hint}</SmallNote>}

            {isError &&
                error?.map((error, i) => (
                    <SmallNote key={i} style={{ color: 'red' }}>
                        * {error}
                    </SmallNote>
                ))}
        </div>
    );
};
