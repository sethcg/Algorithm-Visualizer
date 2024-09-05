import { useState } from 'react'

import './App.css'

import BubbleSort from './components/Bubble/Bubble.tsx'
import CocktailSort from './components/Cocktail/Cocktail.tsx'
import InsertionSort from './components/Insertion/Insertion.tsx'
import QuickSort from './components/Quick/Quick'
import SelectionSort from './components/Selection/Selection'
import MergeSort from './components/Merge/Merge'
import { Sidebar } from './components/Sidebar/Sidebar.tsx'
import { JSX } from 'react/jsx-runtime'

export interface SortItem {
  titleText: string
  active: boolean
  component: JSX.Element
}

const App = function () {
  const [sortItems, setSortItems] = useState<SortItem[]>([
    {
      titleText: 'Bubble Sort',
      component: <BubbleSort></BubbleSort>,
      active: true,
    },
    {
      titleText: 'Cocktail Sort',
      component: <CocktailSort></CocktailSort>,
      active: false,
    },
    {
      titleText: 'Insertion Sort',
      component: <InsertionSort></InsertionSort>,
      active: false,
    },
    {
      titleText: 'Selection Sort',
      component: <SelectionSort></SelectionSort>,
      active: false,
    },
    {
      titleText: 'Quick Sort',
      component: <QuickSort></QuickSort>,
      active: false,
    },
    {
      titleText: 'Merge Sort',
      component: <MergeSort></MergeSort>,
      active: false,
    },
  ])
  const [sort, setSort] = useState<SortItem>(sortItems[0])

  const changeSort = (index: number) => {
    sortItems.forEach((sort: SortItem) => {
      sort.active = false
    })
    sortItems[index].active = true

    setSortItems(sortItems)
    setSort(sortItems[index])
  }

  return (
    <>
      <div className="flex flex-row">
        <Sidebar sortItems={sortItems} changeSort={changeSort}></Sidebar>
        <div className="grow">
          <h2>{sort.titleText}</h2>
          {sort.component}
        </div>
      </div>
    </>
  )
}

export default App
