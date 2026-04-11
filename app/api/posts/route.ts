import posts from '../../data/posts.json';

export async function GET() {
  return Response.json(posts);
}
