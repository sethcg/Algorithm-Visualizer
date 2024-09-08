import { addStep, Box } from '../Extras/Steps'

export function selectionSort(array: Box[]): Box[][] {
  // RECORD EACH "STEP" OF THE SELECTION SORT ALGORITHM AS A NEW ARRAY OF BOXES
  const steps: Box[][] = []
  const boxes: Box[] = array.map((x) => x)

  // FIRST "STEP" SHUFFLED NUMBERS
  addStep(steps, boxes, {
    Selected: () => false,
    Checking: () => false,
    Complete: () => false,
  })

  // RUN THE SELECTION SORT MARKING "STEPS" ALONG THE WAY
  let i: number, j: number, temp: Box
  for (i = 0; i <= boxes.length - 1; i++) {
    let swapIndex = i
    for (j = i + 1; j < boxes.length; j++) {
      // CHECKING BOX
      addStep(steps, boxes, {
        Selected: (_: Box, index: number) => index == i,
        Checking: (_: Box, index: number) => index == j,
        Complete: (_: Box, index: number) => i != 0 && index <= i,
      })

      // FIND THE MINIMUM VALUE TO SWAP WITH
      if (boxes[j].Number < boxes[swapIndex].Number) {
        swapIndex = j
      }
    }

    // SWAP THE NUMBERS
    temp = boxes[i]
    boxes[i] = boxes[swapIndex]
    boxes[swapIndex] = temp

    // CHECKING BOX
    addStep(steps, boxes, {
      Selected: () => false,
      Checking: () => false,
      Complete: (_: Box, index: number) => index <= i,
    })
  }

  // FINAL "STEP" ALL NUMBERS SORTED
  addStep(steps, boxes, {
    Selected: () => false,
    Checking: () => false,
    Complete: () => true,
  })

  return steps
}
