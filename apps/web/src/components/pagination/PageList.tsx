import { useState } from 'react';

interface PageListProps {
    currentPage: number;
    onChange: (page: number) => void;
    totalPages: number;
}

export const PageList = ({
    totalPages,
    currentPage,
    onChange,
}: PageListProps) => {
    const [renderedPageNum, setRenderedPageNum] = useState<number | undefined>(
        totalPages > 10 ? 10 : totalPages,
    );

    return (
        <div
            style={{
                color: 'white',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                gap: '5px',
            }}
        >
            {renderedPageNum! > 10 && (
                <span
                    style={{
                        fontSize: '12px',
                        textDecoration: 'underline',
                        cursor: 'pointer',
                    }}
                    onClick={() => {
                        setRenderedPageNum((prev) => {
                            if (!prev) return;

                            return prev % 10 > 0
                                ? prev - (prev % 10)
                                : prev - 10;
                        });
                    }}
                >
                    prev...
                </span>
            )}
            {Array.from(
                { length: renderedPageNum! > 10 ? 10 : renderedPageNum! },
                (_, i) =>
                    i +
                    (renderedPageNum! >= 10
                        ? renderedPageNum! - 9
                        : renderedPageNum!),
            ).map((pageNum) => (
                <span
                    key={pageNum}
                    style={{
                        fontSize: '12px',
                        textDecoration: 'underline',
                        cursor: 'pointer',
                        color: pageNum === currentPage ? 'grey' : 'white',
                    }}
                    onClick={() => {
                        onChange(pageNum);
                    }}
                >
                    {pageNum}
                </span>
            ))}
            {totalPages > renderedPageNum! && (
                <span
                    style={{
                        textDecoration: 'underline',
                        fontSize: '12px',
                        cursor: 'pointer',
                    }}
                    onClick={() => {
                        setRenderedPageNum((prev) => {
                            if (!prev) return;

                            const remainingPages = totalPages - prev;

                            return remainingPages > 10
                                ? prev + 10
                                : prev + remainingPages;
                        });
                    }}
                >
                    next...
                </span>
            )}
        </div>
    );
};
