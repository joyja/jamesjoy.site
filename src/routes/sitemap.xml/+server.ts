import { getPosts } from "$lib/getPosts";

export async function GET() {
  const posts = await getPosts()
  const pages:string[] = []
  const body = sitemap(posts, pages)
  const response = new Response(body)
  response.headers.set('Cache-Control', 'max-age=0, s-maxage=3600');
  response.headers.set('Content-Type', 'application/xml');
  return response
}

  const sitemap = (posts:{ published:boolean, slug:string }[], pages:string[]) => `<?xml version="1.0" encoding="UTF-8" ?>
    <urlset
      xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
      xmlns:xhtml="https://www.w3.org/1999/xhtml"
      xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
      xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
      xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
    >
      <url>
        <loc>https://jamesjoy.site</loc>
        <changefreq>daily</changefreq>
        <priority>0.7</priority>
      </url>
      ${pages
        .map(
          page => `
      <url>
        <loc>https://jamesjoy.site/${page}</loc>
        <changefreq>daily</changefreq>
        <priority>0.7</priority>
      </url>
      `
        )
        .join('')}
      ${posts
        .map(post =>
          !post.published
            ? null
            : `
      <url>
        <loc>https://jamesjoy.site/posts/${post.slug}</loc>
        <changefreq>daily</changefreq>
        <priority>0.7</priority>
      </url>
      `)
      .join('')}
    </urlset>`