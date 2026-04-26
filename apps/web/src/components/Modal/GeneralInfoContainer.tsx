interface GeneralInfoContainerProps {
    children: React.ReactNode;
}

export const GeneralInfoContainer = ({
    children,
}: GeneralInfoContainerProps) => {
    return (
        <div
            style={{
                border: '1px solid black',
                display: 'flex',
                flexDirection: 'column',
                fontSize: '20px',
                textAlign: 'center',
                gap: '5px',
                height: 'fit-content',
                padding: '30px',
                borderRadius: '5px',
            }}
        >
            {children}
        </div>
    );
};
