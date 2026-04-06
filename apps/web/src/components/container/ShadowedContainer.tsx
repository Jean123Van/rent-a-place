import { COLORS } from '../../styles/colors';

interface ShadowedContainerProps {
    style?: React.CSSProperties;
    children?: React.ReactNode;
}

export const ShadowedContainer = ({
    style,
    children,
}: ShadowedContainerProps) => {
    return (
        <div
            style={{
                ...style,
                border: '1px solid black',
                padding: '20px',
                borderRadius: '10px',
                boxShadow: `8px 8px 0 ${COLORS.skintone}`,
            }}
        >
            {children}
        </div>
    );
};
