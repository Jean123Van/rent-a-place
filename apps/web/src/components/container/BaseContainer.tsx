interface BaseContainerProps {
    style?: React.CSSProperties;
    children?: React.ReactNode;
}

export const BaseContainer = ({ style, children }: BaseContainerProps) => {
    return (
        <div
            style={{
                ...style,
                border: '2px solid white',
                padding: '20px',
                borderRadius: '10px',
            }}
        >
            {children}
        </div>
    );
};
