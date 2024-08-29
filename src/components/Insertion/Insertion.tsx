import { useAutoAnimate } from '@formkit/auto-animate/react'
import { useEffect, useState } from 'react'

import { Box, insertionSort } from './Sort'
import Controls from './Controls'

export default function InsertionSort() {
  const [parent] = useAutoAnimate()
  const [boxes, setBoxes] = useState(
    new Array(10).fill('').map(
      (_, i): Box => ({
        Number: i + 1,
        Swapping: false,
        Selected: false,
        Checking: false,
        Complete: false,
      })
    )
  )
  const [steps, setSteps] = useState<Box[][]>([[...boxes]])

  // BOXES
  const reset = (array: Box[]) => {
    // RESET THE INDEX AND PLAY/PAUSE BUTTONS
    setStatus({ ...status, playing: false, cancelled: true })
    setIndex(0)

    array.forEach((box) => {
    box.Checking = false
      box.Selected = false
      box.Complete = false
    })
  }

  const handleShuffle = async () => {
    reset(boxes)

    for (let i = boxes.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      const temp = boxes[i]
      boxes[i] = boxes[j]
      boxes[j] = temp
    }

    setSteps(
    insertionSort(
        boxes.map((x) => x)
      )
    )
    setBoxes([...boxes])
  }

  // SORTING
  const [index, setIndex] = useState(0)
  const [status, setStatus] = useState({
    playing: false,
    cancelled: false,
  })

  const delay = (ms: number) => {
    return new Promise((resolve) => {
      setTimeout(resolve, ms)
    })
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const incrementStep = async () => {
    if (status.playing && !status.cancelled) {
      await delay(500).then(() => {
        if (status.playing && !status.cancelled) {
          const temp = index.valueOf() + 1
          if (temp <= steps.length - 1) {
            setIndex(temp)
            setBoxes([...steps[temp]])
          }
        }
      })
    }
  }

  useEffect(() => {
    incrementStep()
  }, [incrementStep, index, steps])

  const handleReset = () => {
    reset(boxes)
    setBoxes([...steps[0]])
  }

  const handleSort = async () => {
    setStatus({ ...status, playing: true, cancelled: false })
  }

  const handleCancel = () => {
    setStatus({ ...status, playing: false, cancelled: true })
  }

  const handleIncrement = () => {
    const temp = index.valueOf() + 1
    if (temp < steps.length - 1) {
      setIndex(temp)
      setBoxes([...steps[temp]])
    }
  }
  const handleDecrement = () => {
    const temp = index.valueOf() - 1
    if (temp >= 0) {
      setIndex(temp)
      setBoxes([...steps[temp]])
    }
  }

  return (
    <>
      <div className="flex flex-col gap-4">
        <ul style={containerStyle} ref={parent}>
          {boxes.map((box) => (
            <li
              style={boxStyle}
              key={box.Number}
              className={`${
                box.Swapping
                ? 'bg-yellow-500': box.Checking
                ? 'bg-blue-500': box.Selected
                ? 'bg-red-500' : box.Complete
                ? 'bg-green-500' : 'bg-transparent'
              }`}
            >
              <span>{box.Number}</span>
            </li>
          ))}
        </ul>
        <Controls
          status={status}
          shuffle={handleShuffle}
          sort={handleSort}
          cancel={handleCancel}
          reset={handleReset}
          stepForward={handleIncrement}
          stepBack={handleDecrement}
        ></Controls>
      </div>
    </>
  )
}

const containerStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  margin: '2em, -0.25em, 2em, -0.25em',
}

const boxStyle: React.CSSProperties = {
  boxSizing: 'border-box',
  width: 'calc(10% - 0.5em)',
  margin: '0.25em',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '0.875em',
  fontWeight: '300',
  aspectRatio: '1',
  border: '1px solid white',
}
