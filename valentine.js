// CONSTANTS:
const COLOR_01_CLASS = "clr-01"
const COLOR_02_CLASS = "clr-02"
const COLOR_03_CLASS = "clr-03"
const PARAGRAPH_TEXT_CLASS = "text"

const timePropertiesMap = new Map(
  Object.entries({
    year: "سال",
    season: "فصل",
    month: "ماه",
    week: "هفته",
    day: "روز",
    hour: "ساعت",
    minute: "دقیقه",
    second: "ثانیه",
    millisecond: "میلی‌ثانیه"
  })
)

const numberWithCommas = x => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}
// create span function
const createSpanObject = (text, colorIndex, spaceInTheEnd = "true") => {
  const spanEl = document.createElement("span")
  spanEl.innerText = `${text}${spaceInTheEnd ? " " : ""}`

  const getSpanClassName = index => {
    switch (index) {
      case 1:
        return COLOR_01_CLASS
      case 2:
        return COLOR_02_CLASS
      case 3:
        return COLOR_03_CLASS

      case 4:
        return ""

      default:
        throw new Error("invalid color class Index")
    }
  }
  const spanClassName = getSpanClassName(colorIndex)

  if (spanClassName !== "") {
    spanEl.classList.add(spanClassName)
  }

  console.log(spanEl)
  return { el: spanEl, colorClassName: spanClassName }
}

const createParagraph = spanAndTextArray => {
  // spanAndTextArray gets either:
  // {text:"text"} or
  // {el:spanEl, colorClassName: colorClassName}

  const paragraphEl = document.createElement("p")
  paragraphEl.classList.add(PARAGRAPH_TEXT_CLASS)

  for (spanOrText of spanAndTextArray) {
    if (spanOrText.el) {
      paragraphEl.appendChild(spanOrText.el)
      continue
    }
    paragraphEl.innerText += spanOrText.text
    console.log(spanOrText)
  }

  return paragraphEl
}
const appendToParentElement = (parentElement, paragraphElement) => {
  parentElement.appendChild(paragraphElement)
}

const createParagraphAndAppend = (parentElement, spanAndTextArray) => {
  appendToParentElement(parentElement, createParagraph(spanAndTextArray))
}

const createParagraphBasedOnTimeProperty = (
  parentElement,
  diffAmount,
  engPropertyString,
  colorIndex
) => {
  createParagraphAndAppend(parentElement, [
    createSpanObject(numberWithCommas(diffAmount), colorIndex),
    createSpanObject(timePropertiesMap.get(engPropertyString), 3)
  ])
}

// querySelectors
const textContainerEl = document.querySelector(".text-container")
const btnEl = document.querySelector(".btn")
// -----------------------------------------------

const firstDate = new Date("2023-04-11T02:04:30")

const calculateAndShowParagraphs = () => {
  textContainerEl.innerHTML = ""

  // Get the current date
  let currentDate = new Date()

  // Calculate the difference in milliseconds
  let diffInMilliseconds = currentDate - firstDate

  // Convert the difference to different units
  let diffInSeconds = Math.floor(diffInMilliseconds / 1000)
  let diffInMinutes = Math.floor(diffInSeconds / 60)
  let diffInHours = Math.floor(diffInMinutes / 60)
  let diffInDays = Math.floor(diffInHours / 24)
  let diffInWeeks = Math.floor(diffInDays / 7)
  let diffInMonths = Math.floor(diffInDays / 30.44) // Approximation assumes average month length
  let diffInSeasons = Math.floor(diffInMonths / 3)
  let diffInYears = Math.floor(diffInDays / 365.25) // Accounts for leap years
  createParagraphBasedOnTimeProperty(textContainerEl, diffInYears, "year", 1)
  createParagraphBasedOnTimeProperty(
    textContainerEl,
    diffInSeasons,
    "season",
    1
  )
  createParagraphBasedOnTimeProperty(textContainerEl, diffInMonths, "month", 1)
  createParagraphBasedOnTimeProperty(textContainerEl, diffInWeeks, "week", 1)
  createParagraphBasedOnTimeProperty(textContainerEl, diffInDays, "day", 1)
  createParagraphBasedOnTimeProperty(textContainerEl, diffInHours, "hour", 1)
  createParagraphBasedOnTimeProperty(
    textContainerEl,
    diffInMinutes,
    "minute",
    1
  )
  createParagraphBasedOnTimeProperty(
    textContainerEl,
    diffInSeconds,
    "second",
    1
  )

  createParagraphAndAppend(textContainerEl, [{ text: "از عاشقیمون میگذره :)" }])
  requestAnimationFrame(calculateAndShowParagraphs)
}

btnEl.addEventListener("click", () => {
  btnEl.style.display = "none"
  textContainerEl.style.display = "grid"
  calculateAndShowParagraphs()
})
