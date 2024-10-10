import {ImageResponse} from 'next/og'

export const runtime = 'edge'

const font = fetch(new URL('/assets/Inter.ttf', import.meta.url)).then(
    (res) => res.arrayBuffer()
)

const gradients = [
    'radial-gradient(at right top, rgb(221, 214, 254), rgb(239, 68, 68), rgb(251, 146, 60))',
    'radial-gradient(at right bottom, rgb(255, 255, 255), rgb(244, 114, 182), rgb(240, 171, 252))',
    'radial-gradient(at left bottom, rgb(254, 202, 202), rgb(8, 145, 178), rgb(236, 252, 203))',
    'radial-gradient(at left top, rgb(124, 58, 237), rgb(220, 252, 231), rgb(31, 41, 55))',
    'radial-gradient(at left bottom, rgb(214, 211, 209), rgb(190, 242, 100), rgb(190, 242, 100))'
]

export async function GET(request: Request) {
    const fontData = await font
    const {searchParams} = new URL(request.url)
    const title = searchParams.get('title')

    return new ImageResponse(
        (
            <div
                style={{
                    fontSize: 64,
                    fontFamily: 'Inter',
                    background: 'black',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    textAlign: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                    lineHeight: '1',
                    padding: '0 128px'
                }}
            >
                <div
                    style={{
                        backgroundImage: gradients[Math.floor(gradients.length * Math.random())],
                        backgroundClip: 'text',
                        // @ts-ignore
                        '-webkit-background-clip': 'text',
                        color: 'transparent',
                    }}>
                    {title}
                </div>
            </div>
        ),
        {
            width: 1200,
            height: 600,
            fonts: [
                {
                    name: 'Inter',
                    data: fontData,
                    style: 'normal'
                }
            ]
        }
    );
}