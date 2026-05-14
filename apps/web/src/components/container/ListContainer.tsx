interface ListContainerProps {
    children: React.ReactNode;
}

export const ListContainer = ({ children }: ListContainerProps) => {
    return (
        <div
            style={{
                display: 'flex',
                padding: '50px',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <div
                style={{
                    border: '2px solid white',
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    maxWidth: '700px',
                    padding: '10px',
                    borderRadius: '10px',
                    gap: '10px',
                }}
            >
                {children}
            </div>
        </div>
    );
};
