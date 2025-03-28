'use client';

import { useState, useEffect, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { Input } from '../ui/input';

const AdminSearchComponent = () => {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [queryValue, setQueryValue] = useState(searchParams.get('query') || '');

    useEffect(() => {
        setQueryValue(searchParams.get('query') || '');
    }, [searchParams]);

    return (
        <form action={pathname} method='GET'>
            <Input
                type='search'
                placeholder='Search...'
                name='query'
                value={queryValue}
                onChange={(e) => setQueryValue(e.target.value)}
                className='md:w-[100px] lg:w-[300px]'
            />
            <button className='sr-only' type='submit'>
                Search
            </button>
        </form>
    );
};

const AdminSearch = () => {
    return (
        <Suspense fallback={<div>Loading search...</div>}>
            <AdminSearchComponent />
        </Suspense>
    );
};

export default AdminSearch;
