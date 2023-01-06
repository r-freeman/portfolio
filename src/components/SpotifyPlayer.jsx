import useSWR from 'swr'
import fetcher from '@/lib/fetcher'
import Image from 'next/future/image'
import Link from 'next/link'
import clsx from 'clsx'
import {useEffect} from 'react'
import {animate} from 'motion'

function AnimatedBars() {
    useEffect(() => {
        animate(
            '#bar1',
            {
                transform: [
                    'scaleY(1.0) translateY(0rem)',
                    'scaleY(1.5) translateY(-0.082rem)',
                    'scaleY(1.0) translateY(0rem)'
                ]
            },
            {
                duration: 1.0,
                repeat: Infinity,
                easing: ['ease-in-out']
            }
        );
        animate(
            '#bar2',
            {
                transform: [
                    'scaleY(1.0) translateY(0rem)',
                    'scaleY(3) translateY(-0.083rem)',
                    'scaleY(1.0) translateY(0rem)'
                ]
            },
            {
                delay: 0.2,
                duration: 1.5,
                repeat: Infinity,
                easing: ['ease-in-out']
            }
        );
        animate(
            '#bar3',
            {
                transform: [
                    'scaleY(1.0)  translateY(0rem)',
                    'scaleY(0.5) translateY(0.37rem)',
                    'scaleY(1.0)  translateY(0rem)'
                ]
            },
            {
                delay: 0.3,
                duration: 1.5,
                repeat: Infinity,
                easing: ['ease-in-out']
            }
        );
    }, [])

    return (
        <div className="w-auto flex items-end overflow-hidden flex-shrink-0">
      <span
          id="bar1"
          className="w-1 mr-[3px] h-2 bg-gray-300 dark:bg-green-950"
      />
            <span
                id="bar2"
                className="w-1 mr-[3px] h-1 bg-gray-300 dark:bg-green-950"
            />
            <span
                id="bar3"
                className="w-1 h-3 bg-gray-300 dark:bg-green-950"
            />
        </div>
    )
}

function usePlayerState(path, options) {
    const {data, error, isLoading} = useSWR(`/api/spotify/${path}`, fetcher, options)

    return {
        song: data,
        isLoading,
        isError: error
    }
}

function Song({as: Component = 'div', artist, title, songUrl, album, albumImageUrl, isPlaying}) {
    return (
        <Component
            className="flex items-center space-x-4">
            {isPlaying &&
                <AnimatedBars/>
            }
            <Song.Album
                album={album}
                albumImageUrl={albumImageUrl}
            />
            <div>
                <Song.Title
                    title={title}
                    songUrl={songUrl}
                    className={isPlaying
                        ? 'dark:text-green-950'
                        : 'dark:text-zinc-100'}
                />
                <Song.Artist artist={artist}/>
            </div>
        </Component>
    )
}

Song.Album = function SongAlbum({album, albumImageUrl}) {
    return (
        <Image
            width="64"
            height="64"
            alt={album}
            src={albumImageUrl}
            className="aspect-square rounded-2xl object-cover"
        />
    )
}

Song.Title = function SongTitle({as: Component = 'h2', title, songUrl, className}) {
    return (
        <Component className={clsx(className, 'text-sm font-semibold text-zinc-800')}>
            <Link href={songUrl}>
                {title}
            </Link>
        </Component>
    )
}

Song.Artist = function SongArtist({as: Component = 'p', artist}) {
    return (
        <Component className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-1 lg:line-clamp-none">
            {artist}
        </Component>
    )
}

Song.Skeleton = function SongSkeleton({as: Component = 'div'}) {
    return (
        <Component className="flex items-center space-x-4 animate-pulse">
            <div
                className="w-[64px] h-[64px] bg-zinc-100 rounded-2xl dark:bg-zinc-900"
            />
            <div>
                <p className="w-[128px] h-3 bg-zinc-100 rounded-2xl dark:bg-zinc-900"/>
                <p className="mt-3 w-[128px] h-3 bg-zinc-100 rounded-2xl dark:bg-zinc-900"/>
            </div>
        </Component>
    )
}

function CurrentlyPlaying(props) {
    return (
        <Song {...props}/>
    )
}

function LastPlayed() {
    const {song, isLoading, isError} = usePlayerState('last-played')

    if (isError) return

    return (
        <>
            {isLoading
                ? <Song.Skeleton/>
                : song?.title &&
                <Song {...song} />
            }
        </>
    )
}

export function SpotifyPlayer() {
    const {song, isLoading, isError} = usePlayerState('currently-playing', {refreshInterval: 30000})

    if (isError) return

    return (
        <div className="grid place-items-start">
            {isLoading
                ? <Song.Skeleton/>
                : song?.isPlaying
                    ? <CurrentlyPlaying  {...song}/>
                    : <LastPlayed/>
            }
        </div>
    )
}