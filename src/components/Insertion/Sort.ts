import { addStep, Box } from '../Extras/Steps'

export function insertionSort(array: Box[]): Box[][] {
  // RECORD EACH "STEP" OF THE INSERTION SORT ALGORITHM AS A NEW ARRAY OF BOXES
  const steps: Box[][] = []
  const boxes: Box[] = array.map((x) => x)

  // FIRST "STEP" SHUFFLED NUMBERS
  addStep(steps, boxes, {
    Swapping: () => false,
    Selected: () => false,
    Checking: () => false,
    Complete: () => false,
  })

  // RUNNING INDEX OF COMPLETE VALUES
  let complete: number = 0

  let temp: Box, i: number, j: number
  for (i = 1; i < boxes.length; i++) {
    const currentValue: Box = boxes[i]
    j = i - 1

    addStep(steps, boxes, {
      Swapping: () => false,
      Selected: (_: Box, index: number) => index === i,
      Checking: () => false,
      Complete: (_: Box, index: number) => index <= complete,
    })

    while (j > -1 && currentValue.Number < boxes[j].Number) {
      // CHECKING EACH ALREADY SORTED NUMBERS TO INSERT THE SELECTED NUMBER
      addStep(steps, boxes, {
        Swapping: () => false,
        Selected: (_: Box, index: number) => index === i,
        Checking: (_: Box, index: number) => index === j,
        Complete: (_: Box, index: number) => index <= complete,
      })

      // SWAP THE NUMBERS
      temp = boxes[j]
      boxes[j] = boxes[j + 1]
      boxes[j + 1] = temp
      j--

      // RECORD THE LAST SWAP AS A STEP
      if (!(j > -1 && currentValue.Number < boxes[j].Number)) {
        addStep(steps, boxes, {
          Swapping: (_: Box, index: number) => index === i || index === j + 1,
          Selected: () => false,
          Checking: () => false,
          Complete: (_: Box, index: number) => index <= complete,
        })
      }
    }

    // RESET THE CURRENT SELECTED NUMBER
    boxes.forEach((box) => {
      box.Swapping = false
      box.Selected = false
      box.Checking = false
    })

    boxes[j + 1] = currentValue
    complete++
  }

  // FINAL "STEP" ALL NUMBERS SORTED
  addStep(steps, boxes, {
    Swapping: () => false,
    Selected: () => false,
    Checking: () => false,
    Complete: () => true,
  })

  return steps
}
