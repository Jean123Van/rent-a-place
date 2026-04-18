interface SuccessModalProps {
    isSuccess?: boolean;
}

export const SuccessModal = ({ isSuccess }: SuccessModalProps) => {
    return (
        <span
            style={{
                textAlign: 'center',
                color: 'green',
                fontSize: '15px',
                border: '2px solid green',
                padding: '5px',
                borderRadius: '5px',
                display: isSuccess ? 'inline' : 'none',
            }}
        >
            Successfully created product! Add another product or view created
            product in Products tab
        </span>
    );
};
