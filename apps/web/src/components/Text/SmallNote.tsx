interface SmallNoteProps {
    children?: React.ReactNode;
}

export const SmallNote = ({ children }: SmallNoteProps) => {
    return <p style={{ fontSize: '12px' }}>{children}</p>;
};
