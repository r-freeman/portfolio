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

function Song({artist, title, songUrl, album, albumImageUrl, isPlaying}) {
    return (
        <div className="flex items-center space-x-4">
            {isPlaying &&
                <AnimatedBars/>
            }
            <Image
                width="64"
                height="64"
                alt={album}
                src={albumImageUrl}
                className="aspect-square rounded-2xl object-cover"
            />
            <div>
                <h2 className={clsx(isPlaying ? 'dark:text-green-950' : 'dark:text-zinc-100', 'text-sm font-semibold text-zinc-800')}>
                    <Link href={songUrl}>
                        {title}
                    </Link>
                </h2>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-1 lg:line-clamp-none">{artist}</p>
            </div>
        </div>
    )
}

function SongSkeleton() {
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
                ? <SongSkeleton/>
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
        <div className="grid place-items-center sm:place-items-start">
            {isLoading
                ? <SongSkeleton/>
                : song?.isPlaying
                    ? <CurrentlyPlaying  {...song}/>
                    : <LastPlayed/>
            }
        </div>
    )
}