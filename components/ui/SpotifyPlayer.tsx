'use client'

import useSWR from 'swr'
import fetcher from '@/lib/fetcher'
import Image from 'next/image'
import clsx from 'clsx'
import {ElementType, ReactElement} from 'react'
import Link from 'next/link'

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
} & Artist & Title & Album

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

function Song({as: Component = 'div', artist, title, songUrl, album, albumImageUrl}: Song) {
    return (
        <Component
            className="flex items-center space-x-4">
            <Song.Album
                album={album}
                albumImageUrl={albumImageUrl}
            />
            <div>
                <Song.Title
                    title={title}
                    songUrl={songUrl}
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
        <Component
            className={clsx(className, 'text-sm font-semibold text-zinc-800 dark:text-zinc-100 line-clamp-1 lg:line-clamp-none')}>
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

export function SpotifyPlayer(): ReactElement | null {
    const lastPlayed = usePlayerState('last-played')

    if (lastPlayed.isError) return null

    return (
        <div className="grid">
            {lastPlayed.isLoading
                ? <Song.Skeleton/>
                : <Song {...lastPlayed.song}/>
            }
        </div>
    )
}
