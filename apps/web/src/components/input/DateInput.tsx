import { COLORS } from '../../styles/colors';

interface DateInputProps {
    onChangeStartDate?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onChangeEndDate?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const DateInput = ({
    onChangeStartDate,
    onChangeEndDate,
}: DateInputProps) => {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderBottom: `2px solid ${COLORS.skintone}`,
                paddingBottom: '10px',
            }}
        >
            <div>
                <span>Start Date: </span>
                <input type="date" onChange={onChangeStartDate} />
            </div>
            <div>
                <span>End Date: </span>
                <input type="date" onChange={onChangeEndDate} />
            </div>
        </div>
    );
};
