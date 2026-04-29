import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { COLORS } from '../../styles/colors';
import { forwardRef } from 'react';
import { addDate } from '../../utils/helper/addDate';

interface DateInputProps {
    onChangeStartDate?: (date: Date) => void;
    startDate?: Date;
    onChangeEndDate?: (date: Date) => void;
    endDate?: Date;
}

enum DateType {
    START,
    END,
}

interface CustomInputProps {
    value?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    type: DateType;
}

const DatePickerButton = forwardRef<HTMLButtonElement, CustomInputProps>(
    ({ value, onClick, type }, ref) => (
        <button
            ref={ref}
            onClick={onClick}
            style={{
                fontSize: '15px',
                padding: '5px 10px',
                borderRadius: '7px',
                backgroundColor: 'transparent',
                border: `1px solid ${COLORS.skintone}`,
            }}
        >
            {value || (type === DateType.START ? 'Start date' : 'End date')}
        </button>
    ),
);

export const DateInput = ({
    onChangeStartDate,
    startDate,
    onChangeEndDate,
    endDate,
}: DateInputProps) => {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                borderBottom: `2px solid ${COLORS.skintone}`,
                paddingBottom: '10px',
                gap: '5px',
                width: '100%',
            }}
        >
            <span>Select dates:</span>
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
                    customInput={<DatePickerButton type={DateType.START} />}
                />
                <DatePicker
                    minDate={startDate ? addDate(startDate, 1) : undefined}
                    selected={endDate}
                    onChange={(date: Date | null) => {
                        if (date) {
                            onChangeEndDate?.(date);
                        }
                    }}
                    customInput={<DatePickerButton type={DateType.END} />}
                />
            </div>
        </div>
    );
};
