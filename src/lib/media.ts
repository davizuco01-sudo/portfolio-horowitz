import type { MediaItem } from '../types/project';

/** The still image used to preview a media item on cards, or null if it has none. */
export function previewSource(media: MediaItem | null): { src: string; alt: string } | null {
  if (!media) return null;
  switch (media.type) {
    case 'image':
      return { src: media.src, alt: media.alt };
    case 'video':
      return media.poster ? { src: media.poster, alt: media.title } : null;
    case 'external-video':
      return media.thumbnail ? { src: media.thumbnail, alt: media.title } : null;
  }
}

/**
 * True when the media has a still image usable as a card preview.
 * Cards render their image frame only when this is true.
 */
export function hasMediaPreview(media: MediaItem | null): media is MediaItem {
  return previewSource(media) !== null;
}
