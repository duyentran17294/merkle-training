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

const BLOG_HANDLE = 'news';

export default function Blog({
pageBy = PAGINATION_SIZE,
response,
}: HydrogenRouteProps) {
response.cache(CacheLong());

    return (
        <Layout>
            <Seo type="page" data={{title: 'All Journals'}} />
            <PageHeader heading={BLOG_HANDLE} className="gap-0">
                <Suspense>
                    <JournalsGrid pageBy={pageBy} />
                </Suspense>
            </PageHeader>
        </Layout>
    );
}

function JournalsGrid({pageBy}: {pageBy: number}) {
    const {
        language: {isoCode: languageCode},
        country: {isoCode: countryCode},
    } = useLocalization();

    const {data} = useShopQuery<{
        blog: BlogConnection;
      }>({
        query: QUERY
      });

    return (
        <div>
           aaa
        </div>
    );
}

const QUERY = gql`
  query blog {
        blogs (query: "handle:news", first: 20, after: null) {
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