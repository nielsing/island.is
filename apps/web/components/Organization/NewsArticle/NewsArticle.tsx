import React from 'react'
import cn from 'classnames'

import {
  EmbeddedVideo,
  EmbeddedVideoProps,
  Image,
  ImageProps,
  Slice as SliceType,
} from '@island.is/island-ui/contentful'
import { Box, Text } from '@island.is/island-ui/core'
import { Webreader } from '@island.is/web/components'
import { useI18n } from '@island.is/web/i18n'
import { useDateUtils } from '@island.is/web/i18n/useDateUtils'
import { webRichText } from '@island.is/web/utils/richText'

import { GetSingleNewsItemQuery } from '../../../graphql/schema'
import * as styles from './NewsArticle.css'

interface NewsArticleProps {
  newsItem: GetSingleNewsItemQuery['getSingleNews']
  showDate?: boolean
}

const NewsItemImage = ({ newsItem }: NewsArticleProps) =>
  newsItem?.image && (
    <Box
      paddingY={2}
      className={cn({
        [styles.floatedImage]: newsItem?.fullWidthImageInContent === false,
      })}
    >
      <Image
        {...newsItem?.image}
        url={
          newsItem?.image?.url
            ? newsItem.image?.url + '?w=1000&fm=webp&q=80'
            : ''
        }
        thumbnail={
          newsItem?.image?.url ? newsItem.image?.url + '?w=50&fm=webp&q=80' : ''
        }
      />
    </Box>
  )

export const NewsArticle: React.FC<
  React.PropsWithChildren<NewsArticleProps>
> = ({ newsItem, showDate = true }) => {
  const { format } = useDateUtils()

  const formattedDate = newsItem?.date
    ? format(new Date(newsItem.date), 'do MMMM yyyy')
    : ''

  const { activeLocale } = useI18n()

  const displaySignLanguageVideo = Boolean(newsItem?.signLanguageVideo?.url)
  const displayImageAboveContent =
    !newsItem?.fullWidthImageInContent ||
    (!displaySignLanguageVideo && newsItem?.fullWidthImageInContent)

  return (
    <Box paddingBottom={[0, 0, 4]}>
      <Box className="rs_read">
        <Text variant="h1" as="h1" paddingBottom={2}>
          {newsItem?.title}
        </Text>
      </Box>

      <Webreader
        marginTop={0}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore make web strict
        readId={null}
        readClass="rs_read"
      />

      {showDate && (
        <Box className="rs_read">
          <Text variant="h4" as="p" paddingBottom={2} color="blue400">
            {formattedDate}
          </Text>
        </Box>
      )}

      {displaySignLanguageVideo && (
        <Box paddingBottom={3}>
          <EmbeddedVideo
            url={newsItem?.signLanguageVideo?.url ?? ''}
            locale={activeLocale}
            thumbnailImageUrl={newsItem?.signLanguageVideo?.thumbnailImageUrl}
          />
        </Box>
      )}

      <Box className="rs_read">
        <Text variant="intro" as="p" paddingBottom={2}>
          {newsItem?.intro}
        </Text>
      </Box>

      {displayImageAboveContent && <NewsItemImage newsItem={newsItem} />}

      <Box className="rs_read" paddingBottom={4} width="full">
        {webRichText(
          newsItem?.content
            ? (newsItem?.content as SliceType[])
            : ([] as SliceType[]),
          {
            renderComponent: {
              Image: (slice: ImageProps) => {
                return (
                  <Box className={styles.clearBoth}>
                    <Image
                      {...slice}
                      thumbnail={slice.url + '?w=50'}
                      url={slice.url + '?w=1000&fm=webp&q=80'}
                    />
                  </Box>
                )
              },
              EmbeddedVideo: (slice: EmbeddedVideoProps) => (
                <Box className={styles.clearBoth}>
                  <EmbeddedVideo {...slice} />
                </Box>
              ),
            },
          },
        )}
      </Box>

      {!displayImageAboveContent &&
        displaySignLanguageVideo &&
        newsItem?.fullWidthImageInContent && (
          <NewsItemImage newsItem={newsItem} />
        )}
    </Box>
  )
}
