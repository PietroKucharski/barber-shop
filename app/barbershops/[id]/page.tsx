import Image from "next/image"
import { db } from "../../_lib/prisma"
import { Button } from "../../_components/ui/button"
import {
    ChevronLeftIcon,
    MapPin,
    MapPinIcon,
    MenuIcon,
    StarIcon,
} from "lucide-react"
import BarbershopInfo from "./_components/barbershop-info"
import ServiceItem from "./_components/service-item"
import { getServerSession } from "next-auth"
import { authOptions } from "../../_lib/auth"

interface BarbershopDetailsPageProps {
    params: {
        id?: string
    }
}

const BarbershopDetailsPage = async ({
    params,
}: BarbershopDetailsPageProps) => {
    const session = await getServerSession(authOptions)
    if (!params.id) {
        // redirecionar para home page
        return null
    }

    const barbershop = await db.barbershop.findUnique({
        where: {
            id: params.id,
        },
        include: {
            services: true,
        },
    })

    if (!barbershop) {
        // redirecionar para home page
        return null
    }

    return (
        <div>
            <BarbershopInfo barbershop={barbershop} />
            <div className="px-5 flex flex-col gap-4 py-6">
                {barbershop.services.map((service) => (
                    <ServiceItem
                        key={service.id}
                        service={service}
                        barbershop={barbershop}
                        isAuthenticated={!!session?.user}
                    />
                ))}
            </div>
        </div>
    )
}

export default BarbershopDetailsPage
