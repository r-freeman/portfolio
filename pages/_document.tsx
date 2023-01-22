import {Html, Head, Main, NextScript} from 'next/document'

const modeScript = `
  darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

  updateMode()
  darkModeMediaQuery.addEventListener('change', updateModeWithoutTransitions)
  window.addEventListener('storage', updateModeWithoutTransitions)

  function updateMode() {
    let isSystemDarkMode = darkModeMediaQuery.matches
    let isDarkMode = window.localStorage.isDarkMode === 'true' || (!('isDarkMode' in window.localStorage) && isSystemDarkMode)

    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }

    if (isDarkMode === isSystemDarkMode) {
      delete window.localStorage.isDarkMode
    }
  }

  function disableTransitionsTemporarily() {
    document.documentElement.classList.add('[&_*]:!transition-none')
    window.setTimeout(() => {
      document.documentElement.classList.remove('[&_*]:!transition-none')
    }, 0)
  }

  function updateModeWithoutTransitions() {
    disableTransitionsTemporarily()
    updateMode()
  }
`

export default function Document() {
    return (
        <Html className="h-full antialiased" lang="en">
            <Head>
                <script dangerouslySetInnerHTML={{__html: modeScript}}/>
                <link
                    rel="alternate"
                    type="application/rss+xml"
                    href="/rss/feed.xml"
                />
                <link
                    rel="alternate"
                    type="application/feed+json"
                    href="/rss/feed.json"
                />
                <link
                    rel="icon"
                    type="image/png"
                    href="/static/icons/favicon-16x16.png"
                    sizes="16x16"
                />
                <link
                    rel="icon"
                    type="image/png"
                    href="/static/icons/favicon-32x32.png"
                    sizes="32x32"
                />
                <link
                    rel="apple-touch-icon"
                    href="/static/icons/apple-touch-icon.png"
                />
                <link
                    rel="alternate"
                    type="application/rss+xml"
                    title="RSS feed for ryanfreeman.dev"
                    href="/rss/"
                />
            </Head>
            <script dangerouslySetInnerHTML={{__html: modeScript}}/>
            <body className="flex h-full flex-col dark:bg-black">
            <Main/>
            <NextScript/>
            </body>
        </Html>
    );
}