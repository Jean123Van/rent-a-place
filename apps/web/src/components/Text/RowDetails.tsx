interface RowDetailsProps {
    title: string;
    value: string;
}

export const RowDetails = ({ title, value }: RowDetailsProps) => {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <span
                style={{
                    fontSize: '16px',
                    fontWeight: 'bolder',
                }}
            >
                {title}
            </span>
            <span style={{ fontSize: '15px', color: 'grey' }}>{value}</span>
        </div>
    );
};
