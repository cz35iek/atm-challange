import getCoins from './algorithm.js'

const init = () => {
  let amount = ''
  document.addEventListener('keydown', e => {
    e.preventDefault()
    console.log(e.key)
    
    switch (e.key) {   
      case 'Enter':
        if (amount){
          [...document.querySelectorAll('.node')].map(n=>n.remove())
          const coins = getCoins(parseInt(amount))
          coins.map((c,i) => setTimeout(()=>addNode(c), i*250))
          console.log(coins)
        }
        amount = ''
        break 
      case 'Backspace':            
        amount=amount.substring(0, amount.length-1) 
        break
      default:
        if (e.key.match(/^[0-9]$/i))          
          amount+=e.key
    }
    updateHud(amount)
    return false
  });
}

const updateHud = (text: string) => document.querySelector('#hud').setAttribute('value', '> ' + (text || ''))

const randomPosition = () => [0,0,0].map(_ => Math.random()*2)

const addNode = (text: number) => {
  const scene = document.querySelector('#scene')
  const el = document.createElement('a-text');

  el.setAttribute('color', getColor(text))
  el.setAttribute('font','sourcecodepro')
  el.setAttribute('wrap-count','50')  
  el.setAttribute('side','double')
  el.setAttribute('value', text)
  el.setAttribute('animation', 'property: position; to: ' + randomPosition().join(' ') +'; loop: false; dur: 500')
  el.setAttribute('class', 'node')
  
  scene.appendChild(el)
}

const getColor = (amount: number) => {
  const randomHex = Math.floor((Math.random() * 8) + 8).toString(16)
  switch (amount) {
    case 100:
      return `#${randomHex}00`
    case 50:
      return `#0${randomHex}0`
    case 20:
      return `#0${randomHex}`
    case 10:
      return `#${randomHex}${randomHex}${randomHex}`
    default:
      return 'white'
  }
}

init()
