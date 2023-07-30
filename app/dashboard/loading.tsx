import {metadata} from './page'
import {SimpleLayout} from '@/components/layouts/SimpleLayout'
import {SpinnerIcon} from '@/components/icons/SpinnerIcon'

export default function LoadingSkeleton() {
    return (
        <SimpleLayout heading="Dashboard."
                      description={metadata.description}
                      gradient="bg-gradient-to-r from-orange-300 to-rose-300">
            <SpinnerIcon className="animate-spin w-8 h-8 text-indigo-400"/>
        </SimpleLayout>
    )
}