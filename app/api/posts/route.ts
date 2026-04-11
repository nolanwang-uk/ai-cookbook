export { default as GET } from '../../../app/api/posts/route';

import posts from '../../../../data/posts.json';

export async function GET() {
  return Response.json(posts);
}
