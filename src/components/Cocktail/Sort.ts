import { addStep, Box } from '../Extras/Steps'

export function cocktailSort(array: Box[]): Box[][] {
  // RECORD EACH "STEP" OF THE COCKTAIL SORT ALGORITHM AS A NEW ARRAY OF BOXES
  const steps: Box[][] = []
  const boxes: Box[] = array.map((x) => x)

  // FIRST "STEP" SHUFFLED NUMBERS
  addStep(steps, boxes, {
    Selected: () => false,
    Checking: () => false,
    Complete: () => false,
  })

  // KEEP TRACK OF WHICH BOXES ARE COMPLETE
  const complete: number[] = []

  let temp: Box
  let start: number = 0
  let end: number = boxes.length

  let swapped: boolean = true
  while (swapped) {
    swapped = false
    for (let i = start; i < end - 1; i++) {
      // CHECKING THE CURRENT INDEX
      addStep(steps, boxes, {
        Selected: (_: Box, index: number) => index === i,
        Checking: (_: Box, index: number) => index === i + 1,
        Complete: (box: Box) => complete.includes(box.Number),
      })

      if (boxes[i].Number > boxes[i + 1].Number) {
        // SWAP NUMBERS
        temp = boxes[i]
        boxes[i] = boxes[i + 1]
        boxes[i + 1] = temp
        swapped = true

        // AFTER SWAP STEP
        addStep(steps, boxes, {
          Selected: (_: Box, index: number) => index === i + 1,
          Checking: () => false,
          Complete: (box: Box) => complete.includes(box.Number),
        })
      }
    }

    // COMPLETE THE FRONT-TO-END ITERATION
    complete.push(boxes[end - 1].Number)
    end--
    addStep(steps, boxes, {
      Selected: () => false,
      Checking: () => false,
      Complete: (box: Box) => complete.includes(box.Number),
    })

    // BREAK OUT OF THE LOOP IF NOTHING WAS SWAPPED
    if (!swapped) break

    swapped = false
    for (let i = end - 1; i > start; i--) {
      // CHECKING THE CURRENT INDEX
      addStep(steps, boxes, {
        Selected: (_: Box, index: number) => index === i,
        Checking: (_: Box, index: number) => index === i - 1,
        Complete: (box: Box) => complete.includes(box.Number),
      })

      if (boxes[i - 1].Number > boxes[i].Number) {
        // SWAP NUMBERS
        temp = boxes[i]
        boxes[i] = boxes[i - 1]
        boxes[i - 1] = temp
        swapped = true

        // AFTER SWAP STEP
        addStep(steps, boxes, {
          Selected: (_: Box, index: number) => index === i - 1,
          Checking: () => false,
          Complete: (box: Box) => complete.includes(box.Number),
        })
      }
    }

    // COMPLETE THE END-TO-FRONT ITERATION
    complete.push(boxes[start].Number)
    start++
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
