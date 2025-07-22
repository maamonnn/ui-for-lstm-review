import { ThemeToggleButton } from "@/components/theme-switch"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ArrowLeft, CircleUser } from "lucide-react"
import { useRouter } from "next/navigation"
import React from "react"

export function NavUser() {
    const [mounted, setMounted] = React.useState(false)
    const router = useRouter()

    React.useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return <Button variant="ghost" size="icon" disabled={true}></Button>
    }
  return (
    <div className="flex justify-between  p-2 gap-2 bg-primary-foreground shadow shadow-ring opacity-50">
        <div>
            <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => {router.push('/dashboard')}}>
                <ArrowLeft />
            </Button>
        </div>
        <div className="flex justify-end">
            <ThemeToggleButton />
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon" className="data-[state=open]:bg-accent h-9 w-9">
                        <span className="sr-only">Toggle theme</span>
                        <CircleUser size={16} strokeWidth={1.5} />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                    <div className="grid gap-4">
                    <div className="space-y-2">
                        <h4 className="leading-none font-medium">Dimensions</h4>
                        <p className="text-muted-foreground text-sm">
                        Set the dimensions for the layer.
                        </p>
                    </div>
                    <div className="grid gap-2">
                        <div className="grid grid-cols-3 items-center gap-4">
                        <Label htmlFor="width">Width</Label>
                        <Input
                            id="width"
                            defaultValue="100%"
                            className="col-span-2 h-8"
                        />
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                        <Label htmlFor="maxWidth">Max. width</Label>
                        <Input
                            id="maxWidth"
                            defaultValue="300px"
                            className="col-span-2 h-8"
                        />
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                        <Label htmlFor="height">Height</Label>
                        <Input
                            id="height"
                            defaultValue="25px"
                            className="col-span-2 h-8"
                        />
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                        <Label htmlFor="maxHeight">Max. height</Label>
                        <Input
                            id="maxHeight"
                            defaultValue="none"
                            className="col-span-2 h-8"
                        />
                        </div>
                    </div>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    </div>
  )
}
