import { SortItem } from '../../App'

interface SidebarProps {
  sortItems: SortItem[]
  changeSort: (index: number) => void
}

export const Sidebar = function ({ sortItems, changeSort }: SidebarProps) {
  return (
    <>
      <div className="relative">
        <ul className="flex flex-col gap-4 justify-start">
          {sortItems.map((item: SortItem, index: number) => (
            <li key={index} className="flex justify-start items-start">
              <button
                className={`bg-slate-700 px-3 py-1 rounded-2xl ${item.active ? 'border-2 border-orange-600' : 'border-2 border-transparent'}`}
                onClick={() => {
                  changeSort(index)
                }}
              >
                <span className="font-medium font-mono text-black">
                  {item.titleText}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
