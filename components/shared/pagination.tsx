'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '../ui/button';
import { formUrlQuery } from '@/lib/utils';
import { Suspense } from 'react';

type PaginationProps = {
    page: number | string;
    totalPages: number;
    urlParamName?: string;
};

const PaginationComponent = ({ page, totalPages, urlParamName }: PaginationProps) => {
    const router = useRouter();
    const searchParams = useSearchParams();  // ✅ This must be inside <Suspense>

    const handleClick = (btnType: string) => {
        const pageValue = btnType === 'next' ? Number(page) + 1 : Number(page) - 1;
        const newUrl = formUrlQuery({
            params: searchParams.toString(),
            key: urlParamName || 'page',
            value: pageValue.toString(),
        });

        router.push(newUrl);
    };

    return (
        <div className='flex gap-2'>
            <Button
                size='lg'
                variant='outline'
                className='w-28'
                disabled={Number(page) <= 1}
                onClick={() => handleClick('prev')}
            >
                Previous
            </Button>
            <Button
                size='lg'
                variant='outline'
                className='w-28'
                disabled={Number(page) >= totalPages}
                onClick={() => handleClick('next')}
            >
                Next
            </Button>
        </div>
    );
};

const Pagination = (props: PaginationProps) => {
    return (
        <Suspense fallback={<div>Loading pagination...</div>}>
            <PaginationComponent {...props} />
        </Suspense>
    );
};

export default Pagination;
