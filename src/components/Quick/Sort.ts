export interface Box {
  Number: number
  Pivot: boolean
  Checking: boolean
  Complete: boolean
}

export function quickSort(array: Box[]): Box[][] {
  // RECORD EACH "STEP" OF THE QUICK SORT ALGORITHM AS A NEW ARRAY OF BOXES
  const steps: Box[][] = []
  const boxes: Box[] = array.map((x) => x)

  // FIRST "STEP" SHUFFLED NUMBERS
  steps.push(
    boxes.map((x) => {
      return {
        Number: x.Number,
        Pivot: false,
        Checking: false,
        Complete: false,
      }
    })
  )

  // RUN THE QUICKSORT ALGORITHM ADDING STEPS ALONG THE WAY
  quickSortHelper(boxes, 0, array.length - 1, steps)

  // FINAL "STEP" ALL NUMBERS SORTED
  steps.push(
    boxes.map((x) => {
      return {
        Number: x.Number,
        Pivot: false,
        Checking: false,
        Complete: true,
      }
    })
  )

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
  steps.push(
    boxes.map((x) => {
      return {
        Number: x.Number,
        Pivot: x.Number === pivot,
        Checking: false,
        Complete: false,
      }
    })
  )

  let i: number = leftIndex - 1,
    j: number,
    temp: Box
  for (j = leftIndex; j <= rightIndex - 1; j++) {
    if (i > 0) {
      steps.push(
        boxes.map((x) => {
          return {
            Number: x.Number,
            Pivot: x.Number === pivot,
            Checking: x.Number == boxes[i].Number,
            Complete: false,
          }
        })
      )
    }
    if (boxes[j].Number < pivot) {
      i++

      // SWAP VALUES
      temp = boxes[i]
      boxes[i] = boxes[j]
      boxes[j] = temp

      // RECORD THE SWAP STEP
      steps.push(
        boxes.map((x) => {
          return {
            Number: x.Number,
            Pivot: x.Number === pivot,
            Checking: false,
            Complete: false,
          }
        })
      )
    }
  }

  // SWAP VALUES
  temp = boxes[i + 1]
  boxes[i + 1] = boxes[rightIndex]
  boxes[rightIndex] = temp

  // RECORD THE SWAP STEP
  steps.push(
    boxes.map((x) => {
      return {
        Number: x.Number,
        Pivot: x.Number === pivot,
        Checking: false,
        Complete: false,
      }
    })
  )

  return i + 1
}
