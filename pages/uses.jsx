import Head from 'next/head'

import {Card} from '@/components/Card'
import {Section} from '@/components/Section'
import {SimpleLayout} from '@/components/layouts/SimpleLayout'

function ToolsSection({children, ...props}) {
    return (
        <Section {...props}>
            <ul role="list" className="space-y-16">
                {children}
            </ul>
        </Section>
    )
}

function Tool({title, href, children}) {
    return (
        <Card as="li">
            <Card.Title as="h3" href={href}>
                {title}
            </Card.Title>
            <Card.Description>{children}</Card.Description>
        </Card>
    )
}

export default function Uses() {
    return (
        <>
            <Head>
                <title>Uses - Ryan Freeman</title>
                <meta
                    name="description"
                    content="Software I use, equipment that makes my job easier, and other things I recommend."
                />
                <meta
                    property="og:title"
                    content="Uses - Ryan Freeman"
                />
                <meta
                    property="og:description"
                    content="Software I use, equipment that makes my job easier, and other things I recommend."
                />
            </Head>
            <SimpleLayout
                title="Software I use, equipment that makes my job easier, and other things I recommend."
                intro="I get asked a lot about the things I use to build software and stay productive. Here’s a big list of all of my favourite gear."
                gradient="bg-gradient-to-r from-orange-400 to-rose-400"
            >
                <div className="space-y-20">
                    <ToolsSection title="Workstation">
                        <Tool title="PC Build 2022" href="https://pcpartpicker.com/b/KXfPxr">
                            This is my main Intel-based computer which I built in 2022. This build is composed of some new and old
                            parts which I have gathered over the years. Click here to see a comprehensive listing of all the parts
                            used in this build on PCPartPicker.
                        </Tool>
                        <Tool title="Herman Miller Aeron Chair"
                              href="https://hermanmiller.com/en_eur/products/seating/office-chairs/aeron-chairs/">
                            I bought this chair second-hand when I started working for Apple, it&apos;s extremely comfortable and
                            ergonomic for those long hours spent at the desk.
                        </Tool>
                    </ToolsSection>
                    <ToolsSection title="Development tools">
                        <Tool title="JetBrains" href="https://jetbrains.com/">
                            I use a mix of JetBrain apps for my IDEs depending on what I&apos;m working on. For JavaScript
                            projects, I use WebStorm. PyCharm for python and IntelliJ IDEA Ultimate for Java. I use the same
                            keyboard shortcuts across these apps which is great for productivity.
                        </Tool>
                        <Tool title="Insomnia" href="https://insomnia.rest/">
                            Good tool for designing and testing REST APIs. I used to use Postman but I found the interface too
                            cluttered and prefer the simplicity of Insomnia.
                        </Tool>
                    </ToolsSection>
                    <ToolsSection title="Design">
                        <Tool title="Balsamiq Wireframes" href="https://balsamiq.com/">
                            I use this software for creating low-fidelity wireframes and interfaces. It&apos;s great for
                            experimenting with ideas.
                        </Tool>
                        <Tool title="Color Picker" href="https://learn.microsoft.com/en-us/windows/powertoys/color-picker">
                            Color Picker is included in the PowerToys set of enhancements for Windows. Using the eye dropper you
                            can easily identify colours on the screen and copy the colour&apos;s code to your clipboard for use
                            in other applications.
                        </Tool>
                    </ToolsSection>
                    <ToolsSection title="Automation">
                        <Tool title="AutoHotKey" href="https://autohotkey.com/">
                            AutoHotKey features it&apos;s own scripting language and allows you to create keyboard macros for
                            automating common tasks. For example, I use AutoHotKey to toggle between dark and light themes in
                            Windows on the fly.
                        </Tool>
                    </ToolsSection>
                    <ToolsSection title="Chrome Extensions">
                        <Tool title="Bitwarden"
                              href="https://chrome.google.com/webstore/detail/bitwarden-free-password-m/nngceckbapebfimnlniiiahkandclblb">
                            Bitwarden is a free, open-source password manager, this Chrome Extension connects to a self-hosted
                            instance of Bitwarden which lives on my Raspberry Pi. It is really useful for syncing passwords across
                            devices.
                        </Tool>
                        <Tool title="uBlock Origin"
                              href="https://chrome.google.com/webstore/detail/ublock-origin/cjpalhdlnbpafiamejdnhcphjbkeiagm">
                            Great extension for blocking those annoying YouTube ads and nasty tracking scripts.
                        </Tool>
                        <Tool title="Floccus"
                              href="https://chrome.google.com/webstore/detail/floccus-bookmarks-sync/fnaicdffflnofjppbagibeoednhnbjhg">
                            Floccus syncs your bookmarks across browsers and devices. It connects to my Nextcloud server via
                            WebDAV and keeps my bookmarks in sync, so no matter which device I&apos;m using, I always have the
                            same set of bookmarks.
                        </Tool>
                    </ToolsSection>
                </div>
            </SimpleLayout>
        </>
    )
}