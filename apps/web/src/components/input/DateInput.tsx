import { COLORS } from '../../styles/colors';

export const DateInput = () => {
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
                <input type="date" />
            </div>
            <div>
                <span>End Date: </span>
                <input type="date" />
            </div>
        </div>
    );
};
