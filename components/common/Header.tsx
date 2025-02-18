'use client'

import {Container} from './Container'
import {ThemeButton} from '@/components/ui/ThemeButton'
import {DesktopNavigation, MobileNavigation} from '@/components/ui/Navigation'

export function Header() {
    return (
        <>
            <header
                className="pointer-events-none relative z-50 flex flex-col">
                <div
                    className="top-0 z-10 h-16 pt-6">
                    <Container>
                        <div className="relative flex gap-4">
                            <div className="flex flex-1">
                            </div>
                            <div className="flex flex-1 justify-end md:justify-center">
                                <MobileNavigation className="pointer-events-auto md:hidden"/>
                                <DesktopNavigation className="pointer-events-auto hidden md:block"/>
                            </div>
                            <div className="flex justify-end md:flex-1">
                                <div className="pointer-events-auto">
                                    <ThemeButton/>
                                </div>
                            </div>
                        </div>
                    </Container>
                </div>
            </header>
        </>
    )
}
