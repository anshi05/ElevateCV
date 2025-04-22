"use client"

import { Check } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useState } from "react"

const colorThemes = [
  {
    value: "blue",
    label: "Blue",
    color: "#3b82f6",
  },
  {
    value: "green",
    label: "Green",
    color: "#10b981",
  },
  {
    value: "purple",
    label: "Purple",
    color: "#8b5cf6",
  },
  {
    value: "red",
    label: "Red",
    color: "#ef4444",
  },
  {
    value: "gray",
    label: "Gray",
    color: "#6b7280",
  },
]

interface ColorThemeSelectorProps {
  currentTheme: string
  onSelectTheme: (theme: string) => void
}

export function ColorThemeSelector({ currentTheme, onSelectTheme }: ColorThemeSelectorProps) {
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full sm:w-[200px] justify-between border shadow-sm"
        >
          <div className="flex items-center">
            <div
              className="w-4 h-4 rounded-full mr-2"
              style={{
                backgroundColor: colorThemes.find((theme) => theme.value === currentTheme)?.color || "#3b82f6",
              }}
            />
            {currentTheme ? colorThemes.find((theme) => theme.value === currentTheme)?.label : "Select color..."}
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 shadow-md">
        <Command>
          <CommandInput placeholder="Search color..." />
          <CommandList>
            <CommandEmpty>No color found.</CommandEmpty>
            <CommandGroup>
              {colorThemes.map((theme) => (
                <CommandItem
                  key={theme.value}
                  value={theme.value}
                  onSelect={(value) => {
                    onSelectTheme(value)
                    setOpen(false)
                  }}
                >
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: theme.color }} />
                    {theme.label}
                  </div>
                  <Check
                    className={cn("ml-auto h-4 w-4", currentTheme === theme.value ? "opacity-100" : "opacity-0")}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
