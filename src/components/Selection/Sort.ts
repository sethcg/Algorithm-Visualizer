export interface Box {
  Number: number
  Selected: boolean
  Checking: boolean
  Complete: boolean
}

export function selectionSort(array: Box[]): Box[][] {
  // RECORD EACH "STEP" OF THE SELECTION SORT ALGORITHM AS A NEW ARRAY OF BOXES
  const steps: Box[][] = []
  const boxes: Box[] = array.map((x) => x)

  // FIRST "STEP" SHUFFLED NUMBERS
  steps.push(
    boxes.map((x: Box) => {
      return {
        Number: x.Number,
        Selected: false,
        Checking: false,
        Complete: false,
      }
    })
  )

  // RUN THE SELECTION SORT MARKING "STEPS" ALONG THE WAY
  let i: number, j: number, temp: Box
  for (i = 0; i <= boxes.length - 1; i++) {
    let swapIndex = i
    for (j = i + 1; j < boxes.length; j++) {
      // CHECKING BOX
      steps.push(
        boxes.map((x: Box, index: number) => {
          return {
            Number: x.Number,
            Selected: index == i,
            Checking: index == j,
            Complete: i != 0 && index <= i,
          }
        })
      )

      // FIND THE MINIMUM VALUE TO SWAP WITH
      if (boxes[j].Number < boxes[swapIndex].Number) {
        swapIndex = j
      }
    }

    console.log(`${i} SWAPPED WITH ${swapIndex}`)
    // SWAP THE NUMBERS
    temp = boxes[i]
    boxes[i] = boxes[swapIndex]
    boxes[swapIndex] = temp

    // CHECKING BOX
    steps.push(
      boxes.map((x: Box, index: number) => {
        return {
          Number: x.Number,
          Selected: false,
          Checking: false,
          Complete: index <= i,
        }
      })
    )
  }

  // FINAL "STEP" ALL NUMBERS SORTED
  steps.push(
    boxes.map((x) => {
      return {
        Number: x.Number,
        Selected: false,
        Checking: false,
        Complete: true,
      }
    })
  )

  console.log(steps)
  console.log(boxes)
  return steps
}
