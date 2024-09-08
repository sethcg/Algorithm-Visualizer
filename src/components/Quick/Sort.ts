import { addStep, Box } from '../Extras/Steps'

export function quickSort(array: Box[]): Box[][] {
  // RECORD EACH "STEP" OF THE QUICK SORT ALGORITHM AS A NEW ARRAY OF BOXES
  const steps: Box[][] = []
  const boxes: Box[] = array.map((x) => x)

  // FIRST "STEP" SHUFFLED NUMBERS
  addStep(steps, boxes, {
    Selected: () => false,
    Checking: () => false,
    Complete: () => false,
  })

  // RUN THE QUICKSORT ALGORITHM ADDING STEPS ALONG THE WAY
  quickSortHelper(boxes, 0, array.length - 1, steps)

  // FINAL "STEP" ALL NUMBERS SORTED
  addStep(steps, boxes, {
    Selected: () => false,
    Checking: () => false,
    Complete: () => true,
  })

  return steps
}

// ACTUAL QUICK SORT IMPLEMENTATION
const quickSortHelper = (
  boxes: Box[],
  leftIndex: number,
  rightIndex: number,
  steps: Box[][]
) => {
  if (leftIndex < rightIndex) {
    const partitionIndex = partition(boxes, leftIndex, rightIndex, steps)
    quickSortHelper(boxes, leftIndex, partitionIndex - 1, steps)
    quickSortHelper(boxes, partitionIndex + 1, rightIndex, steps)
  }
}

const partition = (
  boxes: Box[],
  leftIndex: number,
  rightIndex: number,
  steps: Box[][]
) => {
  const pivot = boxes[rightIndex].Number

  // PIVOT CHANGE
  addStep(steps, boxes, {
    Selected: (box: Box) => box.Number === pivot,
    Checking: () => false,
    Complete: () => false,
  })

  let i: number = leftIndex - 1
  let j: number
  let temp: Box

  for (j = leftIndex; j <= rightIndex - 1; j++) {
    if (i > 0) {
      addStep(steps, boxes, {
        Selected: (box: Box) => box.Number === pivot,
        Checking: (box: Box) => box.Number == boxes[i].Number,
        Complete: () => false,
      })
    }
    if (boxes[j].Number < pivot) {
      i++

      // SWAP VALUES
      temp = boxes[i]
      boxes[i] = boxes[j]
      boxes[j] = temp

      // RECORD THE SWAP STEP
      addStep(steps, boxes, {
        Selected: (box: Box) => box.Number === pivot,
        Checking: () => false,
        Complete: () => false,
      })
    }
  }

  // SWAP VALUES
  temp = boxes[i + 1]
  boxes[i + 1] = boxes[rightIndex]
  boxes[rightIndex] = temp

  // RECORD THE SWAP STEP
  addStep(steps, boxes, {
    Selected: (box: Box) => box.Number === pivot,
    Checking: () => false,
    Complete: () => false,
  })

  return i + 1
}
