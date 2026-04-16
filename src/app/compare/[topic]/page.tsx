import { redirect } from 'next/navigation';
import { COMPARISONS } from '@/data/comparisons';

interface Props {
    params: Promise<{ topic: string }>;
}

export async function generateStaticParams() {
    return COMPARISONS.map((post) => ({
        topic: post.slug,
    }));
}

// Redirect /compare/[topic] to /blog/[topic]
export default async function CompareTopicRedirect({ params }: Props) {
    const { topic } = await params;
    redirect(`/blog/${topic}`);
}
