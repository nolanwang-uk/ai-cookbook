import posts from '../../../data/posts.json';

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  
  if (!post) {
    return Response.json({ error: 'Post not found' }, { status: 404 });
  }
  
  return Response.json(post);
}
