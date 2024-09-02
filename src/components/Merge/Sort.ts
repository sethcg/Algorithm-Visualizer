export interface Box {
  Number: number
  Selected: boolean
  Complete: boolean
}

export function mergeSort(array: Box[]): Box[][] {
  // RECORD EACH "STEP" OF THE MERGE SORT ALGORITHM AS A NEW ARRAY OF BOXES
  const steps: Box[][] = []
  const boxes: Box[] = array.map((x) => x)

  // FIRST "STEP" SHUFFLED NUMBERS
  steps.push(
    boxes.map((x) => {
      return {
        Number: x.Number,
        Selected: false,
        Complete: false,
      }
    })
  )

  // RUN THE MERGE ALGORITHM ADDING STEPS ALONG THE WAY
  mergeSortHelper(boxes, steps)

  // FINAL "STEP" ALL NUMBERS SORTED
  steps.push(
    boxes.map((x) => {
      return {
        Number: x.Number,
        Selected: false,
        Complete: true,
      }
    })
  )

  return steps
}

// ACTUAL MERGE SORT IMPLEMENTATION
const merge = (left: Box[], right: Box[]) => {
  const array: Box[] = []

  let i: number = 0,
    j: number = 0
  while (i < left.length && j < right.length) {
    if (left[i].Number < right[j].Number) {
      array.push(left[i])
      i++
    } else {
      array.push(right[j])
      j++
    }
  }
  return array.concat(left.slice(i)).concat(right.slice(j))
}

const mergeSortHelper = (boxes: Box[], steps: Box[][]) => {
  let step: number = 1,
    i: number
  while (step < boxes.length) {
    // ITERATE EACH "STEP" (USUALLY THIS WOULD BE DONE RECURSIVELY)
    for (i = 0; i < boxes.length; i = i + 2 * step) {
      const left = boxes.slice(i, i + step)
      const right = boxes.slice(i + step, i + 2 * step)
      const merged = merge(left, right)

      console.log(merged)

      merged.forEach((box, index) => {
        boxes[i + index] = box
      })

      steps.push(
        boxes.map((x) => {
          return {
            Number: x.Number,
            Selected: merged.map((box: Box) => box.Number).includes(x.Number),
            Complete: false,
          }
        })
      )
    }
    step *= 2
  }

  console.log(boxes)
  return boxes
}
