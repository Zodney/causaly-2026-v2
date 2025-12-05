import * as React from "react"
import { ChartColumnBig, Plus } from "lucide-react"

import { cn } from "@/lib/utils"

interface FeatureCardButtonProps extends React.ComponentProps<"button"> {
  title: string
  description: string
  icon?: React.ComponentType<{ className?: string }>
}

function FeatureCardButton({
  title,
  description,
  icon: Icon = ChartColumnBig,
  className,
  ...props
}: FeatureCardButtonProps) {
  return (
    <button
      type="button"
      data-slot="feature-card-button"
      className={cn(
        "group flex items-center gap-3 border border-dashed border-border rounded-md p-6 transition-all",
        "hover:border-secondary-foreground hover:bg-secondary hover:text-secondary-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className
      )}
      {...props}
    >
      {/* Icon Container */}
      <div className="relative flex-shrink-0">
        {/* Default Icon - Hidden on hover */}
        <div className="flex h-9 w-9 items-center justify-center group-hover:hidden">
          <Icon className="size-6 text-foreground transition-colors group-hover:text-secondary-foreground" />
        </div>

        {/* Hover Icon - Visible only on hover */}
        <div className="hidden h-9 w-9 items-center justify-center rounded-full bg-secondary group-hover:flex">
          <Plus className="size-5 text-secondary-foreground" />
        </div>
      </div>

      {/* Text Container */}
      <div className="flex flex-col items-start gap-0.5">
        <p className="text-sm font-medium text-foreground transition-colors group-hover:text-secondary-foreground">
          {title}
        </p>
        <p className="text-xs text-muted-foreground transition-colors group-hover:text-secondary-foreground">
          {description}
        </p>
      </div>
    </button>
  )
}

export { FeatureCardButton }
