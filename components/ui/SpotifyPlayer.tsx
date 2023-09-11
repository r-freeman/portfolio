'use client'

import useSWR from 'swr'
import fetcher from '@/lib/fetcher'
import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'
import {useEffect, ReactElement, ElementType} from 'react'
import {animate} from 'motion'

type Status = {
    as?: ElementType
    isPlaying: boolean
}

type Artist = {
    as?: ElementType
    artist: string
}

type Title = {
    as?: ElementType
    title: string
    songUrl: string
    className?: string
}

type Album = {
    album: string
    albumImageUrl: string
}

type Song = {
    as?: ElementType
} & Artist & Title & Album & Status

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

type PlayerStateResponse = {
    data: Song
    error: string
    isLoading: boolean
}

function usePlayerState(path: string) {
    const {data, error, isLoading} = useSWR(`/api/spotify/${path}`, fetcher) as PlayerStateResponse

    return {
        song: data,
        isLoading,
        isError: error
    }
}

function Song({as: Component = 'div', artist, title, songUrl, album, albumImageUrl, isPlaying}: Song) {
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

Song.Album = function SongAlbum({album, albumImageUrl}: Album) {
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

Song.Title = function SongTitle({as: Component = 'h2', title, songUrl, className}: Title) {
    return (
        <Component className={clsx(className, 'text-sm font-semibold text-zinc-800 line-clamp-1 lg:line-clamp-none')}>
            <Link href={songUrl}>
                {title}
            </Link>
        </Component>
    )
}

Song.Artist = function SongArtist({as: Component = 'p', artist}: Artist) {
    return (
        <Component className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-1 lg:line-clamp-none">
            {artist}
        </Component>
    )
}

Song.Skeleton = function SongSkeleton() {
    return (
        <div className="flex items-center space-x-4 animate-pulse">
            <div
                className="w-[64px] h-[64px] bg-zinc-100 rounded-2xl dark:bg-zinc-900"
            />
            <div>
                <p className="w-[128px] h-3 bg-zinc-100 rounded-2xl dark:bg-zinc-900"/>
                <p className="mt-3 w-[128px] h-3 bg-zinc-100 rounded-2xl dark:bg-zinc-900"/>
            </div>
        </div>
    )
}

export const revalidate = 0

export function SpotifyPlayer(): ReactElement | null {
    const currentlyPlaying = usePlayerState('currently-playing')
    const lastPlayed = usePlayerState('last-played')

    if (currentlyPlaying.isError || lastPlayed.isError) return null

    return (
        <div className="grid">
            {currentlyPlaying.isLoading
                ? <Song.Skeleton/>
                : currentlyPlaying.song?.isPlaying
                    ? <Song  {...currentlyPlaying.song}/>
                    : lastPlayed.isLoading
                        ? <Song.Skeleton/>
                        : <Song {...lastPlayed.song}/>
            }
        </div>
    )
}
