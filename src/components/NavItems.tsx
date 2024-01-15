'use client'
import { PRODUCT_CATEGORIES } from "@/config"
import { useEffect, useRef, useState } from "react"
import NavItem from "./NavItem"
import useOnClickOutside from "@/hooks/use-on-click-outside"

type Props = {}

const NavItems = (props: Props) => {
    const [activeIndex, setActiveIndex] = useState<null | number>(0)

    const isAnyOpen = activeIndex !== null

    const navRef = useRef<HTMLDivElement | null>(null)
    
    useOnClickOutside(navRef, () => setActiveIndex(null))

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if(e.key === 'Escape') {
                setActiveIndex(null)
            }
        }

        window.addEventListener('keydown', handler)

        return () => window.removeEventListener('keydown', handler)
    }, [])
    
    return (
        <div className="flex gap-4 h-full" ref={navRef}>
            {PRODUCT_CATEGORIES.map((category, idx) => {
                const isOpen = activeIndex === idx

                const handleOpen = () => {
                    isOpen ? setActiveIndex(null) : setActiveIndex(idx)
                }

                return (
                    <NavItem
                        key={category.value}
                        category={category}
                        handleOpen={handleOpen}
                        isOpen={isOpen}
                        isAnyOpen={isAnyOpen}
                    />
                )
            })}
        </div>
    )
}

export default NavItems