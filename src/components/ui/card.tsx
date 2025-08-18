import * as React from 'react'

import { cn } from '@/lib/utils'

function CardRoot({ className, ...props }: React.ComponentProps<'article'>) {
  return (
    <article
      data-slot="card"
      className={cn(
        'bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm',
        className,
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<'header'>) {
  return (
    <header
      data-slot="card-header"
      className={cn(
        '@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-center gap-1.5 px-6 text-start ',
        'has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6',
        className,
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<'h3'>) {
  return (
    <h3
      data-slot="card-title"
      className={cn('leading-none font-semibold', className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p
      data-slot="card-description"
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        'col-start-2 row-span-2 row-start-1 self-start justify-self-end',
        className,
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<'section'>) {
  return (
    <section
      data-slot="card-content"
      className={cn('px-6', className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<'footer'>) {
  return (
    <footer
      data-slot="card-footer"
      className={cn('flex items-center px-6 [.border-t]:pt-6', className)}
      {...props}
    />
  )
}

interface CardProps extends React.ComponentProps<typeof CardRoot> {
  header?: React.ReactNode
  description?: React.ReactNode
  footer?: React.ReactNode
  classNames?: {
    root?: string
    header?: string
    title?: string
    description?: string
    action?: string
    content?: string
    footer?: string
  }
}

function Card({ children, className, classNames, header, description, footer, ...props }: CardProps) {
  const defaultDescription = description ?? header
  const isHeader = !!(header || description)

  return (
    <CardRoot className={cn(classNames?.root, className)} {...props}>
      <CardHeader className={cn(
        isHeader ? '' : 'sr-only',
        classNames?.header,
      )}
      >
        <CardTitle className={classNames?.title}>
          {header ?? 'Card Title'}
        </CardTitle>
        <CardDescription className={cn(description ? '' : 'sr-only', classNames?.description)}>
          {defaultDescription ?? 'Card Description'}
        </CardDescription>
      </CardHeader>

      <CardContent className={classNames?.content}>
        {children}
      </CardContent>
      <CardFooter className={cn(footer ? '' : 'sr-only', classNames?.footer)}>
        {footer}
      </CardFooter>
    </CardRoot>
  )
}

Card.Root = CardRoot
Card.Header = CardHeader
Card.Title = CardTitle
Card.Description = CardDescription
Card.Action = CardAction
Card.Content = CardContent
Card.Footer = CardFooter

export default Card
export {
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardRoot,
  CardTitle,
}
export type { CardProps }
