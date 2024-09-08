import { addStep, Box } from '../Extras/Steps'

export function bubbleSort(array: Box[]): Box[][] {
  const steps: Box[][] = []
  const boxes: Box[] = array.map((x) => x)

  // FIRST "STEP" SHUFFLED NUMBERS
  addStep(steps, boxes, {
    Selected: () => false,
    Checking: () => false,
    Complete: () => false,
  })

  // TRACKS WHICH NUMBERS HAVE "BUBBLED" UP AND ARE SORTED
  const complete: number[] = []

  let i: number, j: number, temp: Box
  for (i = 0; i < boxes.length - 1; i++) {
    for (j = 0; j < boxes.length - i - 1; j++) {
      // SELECT STEP
      addStep(steps, boxes, {
        Selected: (_: Box, index: number) => index === j,
        Checking: () => false,
        Complete: (box: Box) => complete.includes(box.Number),
      })

      // CHECKING STEP
      addStep(steps, boxes, {
        Selected: (_: Box, index: number) => index === j,
        Checking: (_: Box, index: number) => index === j + 1,
        Complete: (box: Box) => complete.includes(box.Number),
      })

      if (boxes[j].Number > boxes[j + 1].Number) {
        // SWAP THE NUMBERS
        temp = boxes[j]
        boxes[j] = boxes[j + 1]
        boxes[j + 1] = temp

        // POST-SWAP STEP
        addStep(steps, boxes, {
          Selected: (_: Box, index: number) => index === j + 1,
          Checking: () => false,
          Complete: (box: Box) => complete.includes(box.Number),
        })
      }
    }

    complete.push(boxes[boxes.length - i - 1].Number)
    addStep(steps, boxes, {
      Selected: () => false,
      Checking: () => false,
      Complete: (box: Box) => complete.includes(box.Number),
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
