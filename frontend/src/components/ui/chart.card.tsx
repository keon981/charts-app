import { createContext, use, useMemo, useState } from 'react'

import { Button, cn, Flex, SelectContent, SelectItem, SelectRoot, SelectTrigger, SelectValue } from 'efai-ui-component'
import { upperFirst } from 'lodash-es'
import { ChevronLeft } from 'lucide-react'

import Card from '@/components/ui/card'

interface Props extends Omit<React.ComponentProps<typeof Card>, 'onSelect'> {
  actions?: Array<React.ComponentProps<typeof SelectItem>> | Array<string>
  selectValue?: string | null
  defaultSelectValue?: string | null
  classNames?: React.ComponentProps<typeof Card>['classNames'] & {
    selectTrigger?: string
  }
  onSelect?: (value: string) => void
}

interface ChartCardContextProps {
  selectValue: string | null
  onSelect: (value: string) => void
  page: number
  setPage: (page: number) => void
  setDescription: (value: string) => void
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
  footer,
  actions,
  onSelect,
  selectValue,
  defaultSelectValue,
  ...props
}: Props) {
  const [description, setDescription] = useState('January - December, 2024')
  const [selectValueState, setSelectValueState] = useState<string | null>(null)
  const [page, setPage] = useState(1)

  const handleSelect = (value: string) => {
    setSelectValueState(value)
    onSelect?.(value)
  }
  const _value = selectValue ?? selectValueState

  const handleBack = () => {
    setPage(1)
    setDescription('January - December, 2024')
  }

  const contextValue = useMemo(() => ({
    selectValue: _value ?? null,
    onSelect: handleSelect,
    page,
    setPage,
    setDescription,
  }), [onSelect, selectValue, selectValueState, page, setPage, setDescription])

  return (
    <ChartCardContext value={contextValue}>
      <Card className={cn(className, classNames?.root)} {...props}>
        <Card.Header className={cn('gap-2 pt-6 border-b', classNames?.header)}>
          <Flex items="start" className="gap-2">
            {page > 1 && (
              <Button variant="ghost" theme="gray" className="size-6 p-0" onClick={handleBack}>
                <ChevronLeft className="" />
              </Button>
            )}
            <div className="grid gap-1">
              <Card.Title className={cn(classNames?.title)}>
                {header ?? 'Chart Card'}
              </Card.Title>
              <Card.Description>
                {description}
              </Card.Description>
            </div>
          </Flex>
          {/* Select */}
          <Card.Action className="flex gap-1.5">
            <SelectRoot
              onValueChange={contextValue.onSelect}
              value={contextValue.selectValue ?? undefined}
              defaultValue={defaultSelectValue ?? undefined}
            >
              <SelectTrigger className={cn('data-[placeholder]:text-gray-400', classNames?.selectTrigger)}>
                <SelectValue placeholder="Select..." />
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
