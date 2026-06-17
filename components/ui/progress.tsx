"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, children, value, ...props }, ref) => (
    <div
      ref={ref}
      role="progressbar"
      aria-valuenow={value}
      data-slot="progress"
      className={cn("flex flex-wrap gap-3", className)}
      {...props}
    >
      {children}
      <ProgressTrack>
        <ProgressIndicator style={{ width: value ? `${value}%` : "0%" }} />
      </ProgressTrack>
    </div>
  )
)
Progress.displayName = "Progress"

const ProgressTrack = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative flex h-1 w-full items-center overflow-x-hidden rounded-full bg-muted",
      className
    )}
    data-slot="progress-track"
    {...props}
  />
))
ProgressTrack.displayName = "ProgressTrack"

const ProgressIndicator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="progress-indicator"
    className={cn("h-full bg-primary transition-all", className)}
    {...props}
  />
))
ProgressIndicator.displayName = "ProgressIndicator"

const ProgressLabel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm font-medium", className)}
    data-slot="progress-label"
    {...props}
  />
))
ProgressLabel.displayName = "ProgressLabel"

const ProgressValue = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "ml-auto text-sm text-muted-foreground tabular-nums",
      className
    )}
    data-slot="progress-value"
    {...props}
  />
))
ProgressValue.displayName = "ProgressValue"

export {
  Progress,
  ProgressTrack,
  ProgressIndicator,
  ProgressLabel,
  ProgressValue,
}
