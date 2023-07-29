import {metadata} from './page'
import {SimpleLayout} from '@/components/layouts/SimpleLayout'

export default function LoadingSkeleton() {
    return (
        <SimpleLayout heading="Dashboard."
                      description={metadata.description}
                      gradient="bg-gradient-to-r from-orange-300 to-rose-300">

        </SimpleLayout>
    )
}