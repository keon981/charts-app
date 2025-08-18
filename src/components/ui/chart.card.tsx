import type { ButtonProps } from 'efai-ui-component'
import { Button, cn } from 'efai-ui-component'

import Card from '@/components/ui/card'

interface Props extends React.ComponentProps<typeof Card> {
  actions?: Array<Omit<ButtonProps, 'key'> & { key: React.Key }>
}

function ChartCard({
  className,
  children,
  classNames,
  header,
  description,
  footer,
  actions,
  ...props
}: Props) {
  return (
    <Card className={cn('pt-0', className, classNames?.root)} {...props}>
      <Card.Header className={cn('gap-2 border-b py-5', classNames?.header)}>
        <div className="grid gap-1">
          <Card.Title className={cn(classNames?.title)}>
            {header ?? 'Chart Card'}
          </Card.Title>
          <Card.Description>
            {description}
          </Card.Description>
        </div>
        <Card.Action className="flex gap-1.5">
          {actions?.map(({ key, ...item }) => (
            <Button key={key} variant="outline" theme="gray" {...item} />
          ))}
        </Card.Action>
      </Card.Header>
      <Card.Content className={cn('mt-4 px-2 sm:px-6 sm:mt-6 min-h-[250px]', classNames?.content)}>
        {children}
      </Card.Content>
      <Card.Footer className={cn('px-2 sm:px-6', classNames?.footer)}>
        {footer}
      </Card.Footer>
    </Card>
  )
}

export default ChartCard
