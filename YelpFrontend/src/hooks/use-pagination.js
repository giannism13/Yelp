import { useCallback, useMemo, useState } from "react";


export const usePagination = (data) => {
    const [page, setPage] = useState(1);
    const [pageSize] = useState(10);

    const count = useMemo(() => data.length, [data]);
    const pageCount = useMemo(
        () => Math.ceil(data.length / pageSize),
        [data, pageSize]
    );

    const pageData = useMemo(() => {
        const start = (page - 1) * pageSize;
        const end = start + pageSize;
        return data.slice(start, end);
    }, [data, page, pageSize]);

    const goToPage = useCallback((pageNumber) => {
        if (pageNumber < 1) {
            setPage(1);
        } else if (pageNumber > pageCount) {
            setPage(pageCount > 0 ? pageCount : 1);
        } else {
            setPage(pageNumber);
        }
    }, [pageCount]);

    return {
        page,
        pageSize,
        count,
        pageData,
        goToPage,
        pageCount,
    };
};