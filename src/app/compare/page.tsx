import { redirect } from 'next/navigation';

// Redirect /compare to /blog — the blog is the canonical home for all articles
export default function CompareRedirect() {
    redirect('/blog');
}
