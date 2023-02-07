import {
    CacheLong,
    flattenConnection,
    gql,
    type HydrogenRouteProps,
    Seo,
    useLocalization,
    useShopQuery,
    useServerAnalytics,
    ShopifyAnalyticsConstants,
    Link,
    useUrl
} from '@shopify/hydrogen';
import type {
    Article,
    Blog as BlogType,
    BlogConnection
} from '@shopify/hydrogen/storefront-api-types';
import {Suspense} from 'react';

import {ArticleCard, Grid, PageHeader} from '~/components';
import {Layout} from '~/components/index.server';
import {getImageLoadingPriority, PAGINATION_SIZE} from '~/lib/const';

export default function Blog({
pageBy = PAGINATION_SIZE,
response
}: HydrogenRouteProps) {
response.cache(CacheLong());
const {pathname} = useUrl();
const arrPathname = pathname.split('/');
const articleType = arrPathname[2];
const articleTypeFull = 'handle:' + articleType;
    return (
        <Layout>
            <Seo type="page" data={{title: 'All Journals'}} />
            <PageHeader heading={articleType} className="gap-0">
                <Suspense>
                    <JournalsGrid
                      pageBy={pageBy}
                      pathname={pathname}
                      articleType={articleTypeFull}
                    />
                </Suspense>
            </PageHeader>
        </Layout>
    );
}

function JournalsGrid({
  pageBy,
  pathname,
  articleType
}: {
  pageBy: number;
  pathname: string;
  articleType: string
}) {
    const {
        language: {isoCode: languageCode},
        country: {isoCode: countryCode},
    } = useLocalization();

    const {data} = useShopQuery<{
        blogs: BlogConnection;
      }>({
        query: QUERY,
        variables: {
          language: languageCode,
          articleType: articleType
        }
      });
    const articles = data.blogs.edges[0].node.articles.edges;
    return (
        <Grid as="ol" layout="blog" gap="blog">
           {articles.map((article) => (
            <li key={article.node.id}>
              <Link to={pathname + '/' + article.node.handle}>
                <h2 className="mt-4 font-medium">{article.node.handle}</h2>
                <span className="block mt-1">{article.node.publishedAt}</span>
              </Link>
            </li>
           ))}
        </Grid>
    );
}

const QUERY = gql`
  query blog(
    $articleType: String!
    $language: LanguageCode
  ) @inContext(language: $language) {
        blogs (query: $articleType, first: 20, after: null) {
          edges {
            node {
              handle
              id
              title
              authors {
                email
              }
              articles(first: 4, after: null) {
                edges {
                  node {
                    author: authorV2 {
                      name
                    }
                    blog {
                      title
                    }
                    contentHtml
                    handle
                    id
                    image {
                      id
                      altText
                      url
                      width
                      height
                    }
                    publishedAt
                    title
                  }
                }
              }
            }
          }
        }
  }
`;