import { MetadataRoute } from 'next'
import { fetchTermsData } from '@/utils/termsData'
import { dikiMetadata } from '@/constants'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = dikiMetadata.url
  const postLists = await fetchTermsData()

  // 홈페이지 URL
  const homepageUrl = {
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: 'always' as const,
    priority: 1.0,
  }

  // 게시물 목록 페이지 URL
  const postsListUrl = {
    url: `${baseUrl}/posts`,
    lastModified: new Date(),
    changeFrequency: 'always' as const,
    priority: 0.9,
  }

  // 개별 게시물 URL들
  const postsUrls = postLists.map(({ url, metadata }) => ({
    url: `${baseUrl}${url}`,
    lastModified: new Date(metadata.updated_at),
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }))

  return [homepageUrl, postsListUrl, ...postsUrls]
}