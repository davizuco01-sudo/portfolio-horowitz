import { ArrowUpRight, Maximize2, Play, X } from 'lucide-react';
import { useRef, useState, type ReactNode } from 'react';
import { labels } from '../../data/labels';
import { placeholders } from '../../data/placeholders';
import { cn } from '../../lib/cn';
import { newTabProps } from '../../lib/content';
import type { ExternalVideoMedia, ImageMedia, MediaItem, VideoMedia } from '../../types/project';
import { MediaPlaceholder } from '../ui/MediaPlaceholder';

const DEFAULT_ASPECT_RATIO = '16 / 10';

function mediaKey(media: MediaItem): string {
  return media.type === 'external-video' ? media.url : media.src;
}

function reportMediaError(path: string) {
  if (import.meta.env.DEV) {
    console.warn(`[media] Could not load "${path}". Check the path in src/data/projects.ts and the file in /public.`);
  }
}

/* -------------------------------------------------------------------------- */
/* ProjectMedia: framed media with optional caption (project pages)           */
/* -------------------------------------------------------------------------- */

interface ProjectMediaProps {
  /** null renders the designed placeholder frame. */
  media: MediaItem | null;
  /** Load immediately; use for media visible on first paint. */
  priority?: boolean;
  /** Aspect ratio used when the media item does not define one. */
  defaultAspectRatio?: string;
  placeholderTag?: string;
  className?: string;
}

export function ProjectMedia({
  media,
  priority = false,
  defaultAspectRatio = DEFAULT_ASPECT_RATIO,
  placeholderTag,
  className,
}: ProjectMediaProps) {
  return (
    <figure className={className}>
      <div
        className="relative overflow-hidden rounded-xl border border-line bg-surface"
        style={{ aspectRatio: media?.aspectRatio ?? defaultAspectRatio }}
      >
        {media ? (
          <MediaContent key={mediaKey(media)} media={media} priority={priority} />
        ) : (
          <MediaPlaceholder tag={placeholderTag} />
        )}
      </div>
      {media?.caption && (
        <figcaption className="mt-3 max-w-prose text-sm leading-6 text-fg-muted">{media.caption}</figcaption>
      )}
    </figure>
  );
}

function MediaContent({ media, priority }: { media: MediaItem; priority: boolean }) {
  const [failed, setFailed] = useState(false);

  if (failed) return <MediaPlaceholder label={placeholders.mediaUnavailable} />;

  const onError = () => {
    reportMediaError(mediaKey(media));
    setFailed(true);
  };

  switch (media.type) {
    case 'image':
      return <EnlargeableImage media={media} priority={priority} onError={onError} />;
    case 'video':
      return <VideoPlayer media={media} onError={onError} />;
    case 'external-video':
      return <ExternalVideoLink media={media} />;
  }
}

/**
 * Image that opens in a native <dialog> when activated. The dialog traps
 * focus, closes with Escape, and returns focus to the trigger on close.
 */
function EnlargeableImage({
  media,
  priority,
  onError,
}: {
  media: ImageMedia;
  priority: boolean;
  onError: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const open = () => dialogRef.current?.showModal();
  const close = () => dialogRef.current?.close();

  return (
    <>
      <button
        type="button"
        onClick={open}
        className="group/zoom absolute inset-0 block h-full w-full cursor-zoom-in focus-visible:outline-offset-[-3px]"
      >
        <span className="sr-only">{labels.media.enlarge}: </span>
        <img
          src={media.src}
          alt={media.alt}
          width={media.width}
          height={media.height}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : undefined}
          decoding="async"
          onError={onError}
          className="h-full w-full object-contain"
        />
        <span
          aria-hidden
          className="absolute top-3 right-3 flex size-8 items-center justify-center rounded-md border border-line-strong bg-canvas/80 text-fg-secondary opacity-0 transition-opacity duration-200 group-hover/zoom:opacity-100 group-focus-visible/zoom:opacity-100"
        >
          <Maximize2 className="size-4" />
        </span>
      </button>

      {/*
        Clicking the backdrop (the dialog element itself) closes the viewer. This is a pointer
        convenience only: keyboard users close it with Escape (native) or the close button.
      */}
      {/* oxlint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
      <dialog
        ref={dialogRef}
        aria-label={media.alt}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
        className="m-auto max-h-none max-w-none overflow-visible bg-transparent p-0 text-fg"
      >
        <div className="flex max-h-[94dvh] w-[min(94vw,1400px)] flex-col items-center gap-3 p-2">
          <div className="flex w-full justify-end">
            <button
              type="button"
              onClick={close}
              aria-label={labels.media.close}
              className="flex size-10 items-center justify-center rounded-full border border-line-strong bg-surface text-fg transition-colors hover:bg-surface-2"
            >
              <X aria-hidden className="size-5" />
            </button>
          </div>
          <img
            src={media.src}
            alt={media.alt}
            loading="lazy"
            decoding="async"
            className="max-h-[80dvh] w-auto max-w-full rounded-lg object-contain"
          />
          {media.caption && <p className="max-w-prose text-center text-sm text-fg-secondary">{media.caption}</p>}
        </div>
      </dialog>
    </>
  );
}

function VideoPlayer({ media, onError }: { media: VideoMedia; onError: () => void }) {
  return (
    // Captions are optional per video (`captions` in the content file), so the
    // <track> is conditional and the static lint rule cannot see it.
    // oxlint-disable-next-line jsx-a11y/media-has-caption
    <video
      controls
      playsInline
      preload="metadata"
      src={media.src}
      poster={media.poster}
      aria-label={media.title}
      onError={onError}
      className="absolute inset-0 h-full w-full bg-canvas object-contain"
    >
      {media.captions && <track kind="captions" src={media.captions} srcLang="en" label="English" default />}
    </video>
  );
}

function ExternalVideoLink({ media }: { media: ExternalVideoMedia }) {
  const [thumbnailFailed, setThumbnailFailed] = useState(false);
  const showThumbnail = media.thumbnail && !thumbnailFailed;

  return (
    <a
      href={media.url}
      {...newTabProps(media.url)}
      className="group/video absolute inset-0 flex items-center justify-center focus-visible:outline-offset-[-3px]"
    >
      {showThumbnail ? (
        <img
          src={media.thumbnail}
          alt=""
          loading="lazy"
          decoding="async"
          onError={() => {
            reportMediaError(media.thumbnail ?? '');
            setThumbnailFailed(true);
          }}
          className="absolute inset-0 h-full w-full object-cover opacity-80 transition-opacity duration-300 group-hover/video:opacity-100"
        />
      ) : (
        <span aria-hidden className="absolute inset-0 bg-blueprint opacity-60" />
      )}
      <span className="relative flex items-center gap-3 rounded-full border border-line-strong bg-canvas/90 px-5 py-3 text-sm font-medium text-fg transition-colors group-hover/video:border-accent">
        <Play aria-hidden className="size-4 fill-current text-accent" />
        {labels.media.watchVideo}
        <span className="sr-only">
          : {media.title} {labels.newTab}
        </span>
        <ArrowUpRight aria-hidden className="size-4 text-fg-muted" />
      </span>
    </a>
  );
}

/* -------------------------------------------------------------------------- */
/* MediaPreview: non-interactive preview that fills its parent (cards)        */
/* -------------------------------------------------------------------------- */

function previewSource(media: MediaItem): { src: string; alt: string } | null {
  switch (media.type) {
    case 'image':
      return { src: media.src, alt: media.alt };
    case 'video':
      return media.poster ? { src: media.poster, alt: media.title } : null;
    case 'external-video':
      return media.thumbnail ? { src: media.thumbnail, alt: media.title } : null;
  }
}

export function MediaPreview({
  media,
  compact = false,
  placeholderTag,
}: {
  media: MediaItem | null;
  compact?: boolean;
  placeholderTag?: string;
}) {
  const source = media ? previewSource(media) : null;
  const placeholder = (
    <MediaPlaceholder
      compact={compact}
      tag={placeholderTag}
      label={compact ? placeholders.mediaShort : placeholders.media}
    />
  );
  if (!source) return placeholder;
  return <PreviewImage key={source.src} src={source.src} alt={source.alt} fallback={placeholder} />;
}

function PreviewImage({ src, alt, fallback }: { src: string; alt: string; fallback: ReactNode }) {
  const [failed, setFailed] = useState(false);
  if (failed) return fallback;
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => {
        reportMediaError(src);
        setFailed(true);
      }}
      className={cn(
        'h-full w-full object-cover transition-transform duration-500 ease-out-soft',
        'motion-safe:group-hover:scale-[1.015]',
      )}
    />
  );
}
