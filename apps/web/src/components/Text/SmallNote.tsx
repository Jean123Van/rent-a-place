interface SmallNoteProps {
    children?: React.ReactNode;
    style?: React.CSSProperties;
}

export const SmallNote = ({ children, style }: SmallNoteProps) => {
    return (
        <p
            style={{
                fontSize: '12px',
                margin: '0px',
                ...style,
            }}
        >
            {children}
        </p>
    );
};
