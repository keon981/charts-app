import { createContext, use, useMemo, useState } from 'react'

import { cn, SelectContent, SelectItem, SelectRoot, SelectTrigger, SelectValue } from 'efai-ui-component'
import { upperFirst } from 'lodash-es'

import Card from '@/components/ui/card'

interface Props extends Omit<React.ComponentProps<typeof Card>, 'onSelect'> {
  actions?: Array<React.ComponentProps<typeof SelectItem>> | Array<string>
  selectValue?: string | null
  defaultSelectValue?: string | null
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
  defaultSelectValue,
  ...props
}: Props) {
  const [selectValueState, setSelectValueState] = useState<string | null>(null)
  const handleSelect = (value: string) => {
    setSelectValueState(value)
    onSelect?.(value)
  }
  const value = selectValue ?? selectValueState
  const contextValue = useMemo(() => ({
    selectValue: value ?? undefined,
    onSelect: handleSelect,
  }), [onSelect, selectValue, selectValueState])

  return (
    <ChartCardContext value={contextValue}>
      <Card className={cn(className, classNames?.root)} {...props}>
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
            <SelectRoot
              onValueChange={contextValue.onSelect}
              value={contextValue.selectValue}
              defaultValue={defaultSelectValue ?? undefined}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <ActionList data={actions ?? []} />
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

function ActionList({ data }: { data: Array<string> | Array<React.ComponentProps<typeof SelectItem>> }) {
  if (!data.length) return null
  if (typeof data[0] === 'string') {
    return (
      <>
        {
          (data as Array<string>).map(item => (
            <SelectItem key={item} value={item}>
              {upperFirst(item)}
            </SelectItem>
          ))
        }
      </>
    )
  }

  return (
    <>
      {
        (data as Array<React.ComponentProps<typeof SelectItem>>).map((item) => {
          const value = upperFirst(item.value)
          return (
            <SelectItem key={item.value} {...item}>
              {value ?? item.children}
            </SelectItem>
          )
        })
      }
    </>
  )
}

export default ChartCard
export { useChartCard }
