import {BriefcaseIcon} from '@/components/icons/BriefcaseIcon'
import {ArrowDownIcon} from '@/components/icons/ArrowDownIcon'
import {Button} from './Button'
import {Cta} from './Cta'

type Work = {
    company: string
    title: string
    start: {
        label: string
        dateTime: string
    }
    end: {
        label: string
        dateTime: string
    }
}

export function Resume() {
    const work: Work[] = [
        {
            company: 'Aer Lingus',
            title: 'Software engineer',
            start: {
                label: '2022',
                dateTime: '2022'
            },
            end: {
                label: 'present',
                dateTime: new Date().getFullYear().toString()
            }
        },
        {
            company: 'Apple',
            title: 'At home advisor',
            start: {
                label: '2014',
                dateTime: '2014'
            },
            end: {
                label: '2018',
                dateTime: '2018'
            }
        }
    ]

    return (
        <Cta icon={BriefcaseIcon} title="Work">
            <ol className="mt-6 space-y-4">
                {work.map((role, roleIndex) => (
                    <li key={roleIndex} className="flex gap-4">
                        <dl className="flex flex-auto flex-wrap gap-x-2">
                            <dt className="sr-only">Company</dt>
                            <dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
                                {role.company}
                            </dd>
                            <dt className="sr-only">Role</dt>
                            <dd className="text-xs text-zinc-500 dark:text-zinc-400">
                                {role.title}
                            </dd>
                            <dt className="sr-only">Date</dt>
                            <dd
                                className="ml-auto text-xs text-zinc-500 dark:text-zinc-400"
                                aria-label={`${role.start.label ?? role.start} until ${
                                    role.end.label ?? role.end
                                }`}
                            >
                                <time dateTime={role.start.dateTime ?? role.start}>
                                    {role.start.label ?? role.start}
                                </time>
                                <span aria-hidden="true">–</span>
                                <time dateTime={role.end.dateTime ?? role.end}>
                                    {role.end.label ?? role.end}
                                </time>
                            </dd>
                        </dl>
                    </li>
                ))}
            </ol>
            <Button href="/Ryan Freeman CV.pdf" variant="secondary" className="group mt-6 w-full">
                Download CV
                <ArrowDownIcon
                    className="h-4 w-4 stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50"/>
            </Button>
        </Cta>
    )
}