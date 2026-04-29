import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { COLORS } from '../../styles/colors';
import { forwardRef } from 'react';
import { addDate } from '../../utils/helper/addDate';
import { SmallNote } from '../Text/SmallNote';

enum DateType {
    START,
    END,
}

interface CustomInputProps {
    value?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    type: DateType;
    isError?: boolean;
}

const DatePickerButton = forwardRef<HTMLButtonElement, CustomInputProps>(
    ({ value, onClick, type, isError }, ref) => (
        <button
            ref={ref}
            onClick={onClick}
            style={{
                fontSize: '15px',
                padding: '5px 10px',
                borderRadius: '7px',
                backgroundColor: 'transparent',
                border: isError
                    ? '1px solid red'
                    : `1px solid ${COLORS.skintone}`,
                color: isError ? 'red' : 'black',
            }}
        >
            {value || (type === DateType.START ? 'Start date' : 'End date')}
        </button>
    ),
);

interface DateInputProps {
    onChangeStartDate?: (date: Date) => void;
    startDate?: Date;
    onChangeEndDate?: (date: Date) => void;
    endDate?: Date;
    error?: string[];
}

export const DateInput = ({
    onChangeStartDate,
    startDate,
    onChangeEndDate,
    endDate,
    error,
}: DateInputProps) => {
    const isError = (error?.length || 0) >= 1;

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                gap: '4px',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    borderBottom: isError
                        ? '2px solid red'
                        : `2px solid ${COLORS.skintone}`,
                    paddingBottom: '10px',
                    gap: '5px',
                    width: '100%',
                }}
            >
                <span style={{ color: isError ? 'red' : 'black' }}>
                    Select dates:
                </span>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        gap: '4px',
                    }}
                >
                    <DatePicker
                        maxDate={endDate ? addDate(endDate, -1) : undefined}
                        selected={startDate}
                        onChange={(date: Date | null) => {
                            if (date) {
                                onChangeStartDate?.(date);
                            }
                        }}
                        customInput={
                            <DatePickerButton
                                type={DateType.START}
                                isError={isError}
                            />
                        }
                    />
                    <DatePicker
                        minDate={startDate ? addDate(startDate, 1) : undefined}
                        selected={endDate}
                        onChange={(date: Date | null) => {
                            if (date) {
                                onChangeEndDate?.(date);
                            }
                        }}
                        customInput={
                            <DatePickerButton
                                type={DateType.END}
                                isError={isError}
                            />
                        }
                    />
                </div>
            </div>
            {isError &&
                error?.map((error, i) => (
                    <SmallNote key={i} style={{ color: 'red' }}>
                        * {error}
                    </SmallNote>
                ))}
        </div>
    );
};
