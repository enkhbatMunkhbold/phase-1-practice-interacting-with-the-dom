let counter = document.querySelector('#counter')
const minus = document.querySelector('button#minus')
const plus = document.querySelector('button#plus')
const like = document.querySelector('button#heart')
const pause = document.querySelector('button#pause')
const submit = document.querySelector('#comment-form')
let flagPaused = 'resumed'

let likeTimes = {}
let seconds = 0

const timerCount = () => {
  seconds++
  counter.textContent = seconds
}

let startTimer = 0
startTimer = setInterval(timerCount, 1000)

minus.addEventListener('click', () => {
  seconds--
  counter.textContent = seconds
})

plus.addEventListener('click', () => {
  seconds++
  counter.textContent = seconds
})

like.addEventListener('click', () => {
  const li = document.createElement('li')
  if(!Object.keys(likeTimes).includes(`${seconds}`)) {
    likeTimes[seconds] = 1
  } else {
    likeTimes[seconds]++
  }

  const times = likeTimes[seconds] > 1 ? 'times' : 'time'

  li.textContent = `${seconds} has been liked ${likeTimes[seconds]} ${times}`
  document.querySelector('ul.likes').append(li) 
})

const handleSubmit = e => {
  e.preventDefault()
  const comment = document.querySelector('div.comments')
  const input = document.querySelector('input#comment-input')
  const text = document.createElement('p')
  text.textContent = input.value
  comment.appendChild(text)
  submit.reset() 
}

submit.addEventListener('submit', handleSubmit)

pause.addEventListener('click', () => {
  if(flagPaused === 'resumed') {
    clearTimeout(startTimer)
    plus.disabled = true
    minus.disabled = true
    like.disabled = true    
    pause.textContent = 'resume'
    flagPaused = 'paused'
  } else if(flagPaused === 'paused'){
    plus.disabled = false
    minus.disabled = false
    like.disabled = false    
    startTimer = setInterval(timerCount, 1000)    
    pause.textContent = 'pause'
    flagPaused = 'resumed'
  }  
})
