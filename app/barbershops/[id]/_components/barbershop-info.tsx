"use client"

import Image from "next/image"
import {
    ChevronLeftIcon,
    MapPinIcon,
    MenuIcon,
    StarIcon,
} from "lucide-react"
import { Button } from "../../../_components/ui/button"
import { Barbershop } from "@prisma/client"
import { useRouter } from "next/navigation"
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "../../../_components/ui/sheet"
import SideMenu from "../../../_components/side-menu"

interface BarbershopInfoProps {
    barbershop: Barbershop
}

const BarbershopInfo = ({ barbershop }: BarbershopInfoProps) => {
    const router = useRouter()

    const handleBackClick = () => {
        router.replace("/")
    }
    return (
        <div>
            <div className="h-[256px] w-full relative">
                <Button
                    variant="outline"
                    size="icon"
                    className="z-50 top-4 left-4 absolute"
                    onClick={handleBackClick}
                >
                    <ChevronLeftIcon />
                </Button>

                <Sheet>
                    <SheetTrigger asChild>
                        <Button
                            variant="outline"
                            size="icon"
                            className="z-50 top-4 right-4 absolute"
                        >
                            <MenuIcon />
                        </Button>
                    </SheetTrigger>
                    <SheetContent className="p-0">
                        <SideMenu />
                    </SheetContent>
                </Sheet>
                <Image
                    alt={barbershop.name}
                    src={barbershop.imageUrl}
                    fill
                    style={{ objectFit: "cover" }}
                    className="opacity-75"
                />
            </div>

            <div className="px-5 pt-3 pb-6 border-b border-solid border-secondary">
                <h1 className="text-xl font-bold">{barbershop.name}</h1>
                <div className="flex items-center gap-1 mt-2">
                    <MapPinIcon className="text-primary" size={18} />
                    <p className="text-sm">{barbershop.address}</p>
                </div>
                <div className="flex items-center gap-1 mt-2">
                    <StarIcon className="text-primary" size={18} />
                    <p className="text-sm">5,0 (889 avaliações)</p>
                </div>
            </div>
        </div>
    )
}

export default BarbershopInfo
