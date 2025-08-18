import { createContext, use, useMemo, useState } from 'react'

import { Button, cn, SelectContent, SelectGroup, SelectItem, SelectRoot, SelectTrigger, SelectValue } from 'efai-ui-component'

import Card from '@/components/ui/card'

interface Props extends Omit<React.ComponentProps<typeof Card>, 'onSelect'> {
  actions?: Array<React.ComponentProps<typeof SelectItem>>
  selectValue?: string | null
  onSelect?: (value: string) => void
}

interface ChartCardContextProps {
  selectValue?: string | null
  onSelect?: (value: string) => void
}
const ChartCardContext = createContext<ChartCardContextProps | null>(null)

function useChartCard() {
  const context = use(ChartCardContext)

  if (!context) {
    throw new Error('useChartCard must be used within a <ChartCard />')
  }

  return context
}

function ChartCard({
  className,
  children,
  classNames,
  header,
  description,
  footer,
  actions,
  onSelect,
  selectValue,
  ...props
}: Props) {
  const [defaultSelectValue, setDefaultSelectValue] = useState<string | null>(null)
  const handleSelect = (value: string) => {
    setDefaultSelectValue(value)
    onSelect?.(value)
  }
  const value = selectValue ?? defaultSelectValue
  const contextValue = useMemo(() => ({
    selectValue: value ?? undefined,
    onSelect: handleSelect,
  }), [onSelect, selectValue, defaultSelectValue])

  return (
    <ChartCardContext value={contextValue}>
      <Card className={cn('', className, classNames?.root)} {...props}>
        <Card.Header className={cn('gap-2 pt-6 border-b', classNames?.header)}>
          <div className="grid gap-1">
            <Card.Title className={cn(classNames?.title)}>
              {header ?? 'Chart Card'}
            </Card.Title>
            <Card.Description>
              {description}
            </Card.Description>
          </div>
          <Card.Action className="flex gap-1.5">
            <SelectRoot onValueChange={contextValue.onSelect} value={contextValue.selectValue}>
              <SelectTrigger>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {
                    actions?.map(({ key, ...item }) => {
                      const value = item.value.charAt(0).toUpperCase() + item.value.slice(1)
                      return (
                        <SelectItem key={key} {...item}>
                          {value ?? item.children}
                        </SelectItem>
                      )
                    })
                  }
                </SelectGroup>
              </SelectContent>
            </SelectRoot>
          </Card.Action>
        </Card.Header>
        <Card.Content className={cn('mt-4 px-2 pb-4 min-h-[250px]', classNames?.content)}>
          {children}
        </Card.Content>
        <Card.Footer className={cn(classNames?.footer)}>
          {footer}
        </Card.Footer>
      </Card>
    </ChartCardContext>
  )
}

export default ChartCard
export { useChartCard }
