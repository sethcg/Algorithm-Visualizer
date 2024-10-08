import { useAutoAnimate } from '@formkit/auto-animate/react'
import { useEffect, useState } from 'react'

import { insertionSort } from './Sort'

import { Box } from '../Extras/Steps'
import Controls from '../Extras/Controls'

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

  const reset = () => {
    // RESET THE INDEX AND PLAY/PAUSE BUTTONS
    setStatus({ ...status, playing: false, cancelled: true, reset: true })
    setIndex(0)
  }

  const handleShuffle = async () => {
    reset()

    for (let i = boxes.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      const temp = boxes[i]
      boxes[i] = boxes[j]
      boxes[j] = temp
    }

    setSteps(insertionSort(boxes.map((x) => x)))
    setBoxes([...boxes])
  }

  // SORTING
  const [index, setIndex] = useState(0)
  const [status, setStatus] = useState({
    playing: false,
    cancelled: false,
    reset: false,
  })

  const delay = (ms: number) => {
    return new Promise((resolve) => {
      setTimeout(resolve, ms)
    })
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const incrementStep = async () => {
    if (status.playing && !status.cancelled) {
      await delay(250).then(() => {
        if (status.playing && !status.cancelled) {
          const temp = index.valueOf() + 1
          if (temp < steps.length - 1) {
            setIndex(temp)
            setBoxes([...steps[temp]])
          } else if (temp == steps.length - 1) {
            // DONE
            setIndex(temp)
            setBoxes([...steps[temp]])
            setStatus({
              ...status,
              playing: false,
              cancelled: true,
              reset: false,
            })
          }
        }
      })
    } else if (status.reset) {
      await delay(250).then(() => {
        setBoxes([...steps[0]])
        setStatus({ ...status, playing: false, cancelled: true, reset: false })
      })
    }
  }

  useEffect(() => {
    incrementStep()
  }, [incrementStep, index, steps])

  const handleReset = () => {
    reset()
  }

  const handleSort = async () => {
    setStatus({ ...status, playing: true, cancelled: false, reset: false })
  }

  const handleCancel = () => {
    setStatus({ ...status, playing: false, cancelled: true, reset: false })
  }

  const handleIncrement = () => {
    const temp = index.valueOf() + 1
    if (temp <= steps.length - 1) {
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
        <ul ref={parent} className="flex flex-row grow mx-8 my-2">
          {boxes.map((box) => (
            <li
              style={{
                height: `calc(${box.Number * 1}rem + 50px)`,
                width: 'calc(10% - 0.5em)',
              }}
              key={box.Number}
              className={`flex items-center justify-center mt-auto mx-1 box-border border-b-gray-50 border-2 ${
                box.Swapping
                  ? 'bg-yellow-500'
                  : box.Checking
                    ? 'bg-blue-500'
                    : box.Selected
                      ? 'bg-red-500'
                      : box.Complete
                        ? 'bg-green-500'
                        : 'bg-transparent'
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
