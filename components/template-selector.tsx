"use client"

import { Check } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useState } from "react"

const templates = [
  {
    value: "professional",
    label: "Professional",
  },
  {
    value: "modern",
    label: "Modern",
  },
  {
    value: "minimalist",
    label: "Minimalist",
  },
]

interface TemplateSelectorProps {
  currentTemplate: string
  onSelectTemplate: (template: string) => void
}

export function TemplateSelector({ currentTemplate, onSelectTemplate }: TemplateSelectorProps) {
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
          {currentTemplate
            ? templates.find((template) => template.value === currentTemplate)?.label
            : "Select template..."}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 shadow-md">
        <Command>
          <CommandInput placeholder="Search template..." />
          <CommandList>
            <CommandEmpty>No template found.</CommandEmpty>
            <CommandGroup>
              {templates.map((template) => (
                <CommandItem
                  key={template.value}
                  value={template.value}
                  onSelect={(value) => {
                    onSelectTemplate(value)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn("mr-2 h-4 w-4", currentTemplate === template.value ? "opacity-100" : "opacity-0")}
                  />
                  {template.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
