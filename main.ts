import getCoins from './algorithm'
import createGraph from 'ngraph.graph'
import * as THREE from 'three'

const randomPosition = () => [0,0,0].map(_ => Math.random()*2)
const randomColor = () => '#' + new THREE.Color(Math.random() * 0.7 + 0.3, Math.random() * 0.7 + 0.3, Math.random() * 0.7 + 0.3).getHexString()

const g = createGraph()
const layout = require('ngraph.forcelayout3d')(g, {
  springLength: 2.5, //30
  springCoeff: 0.0008, //0.0008
  gravity: 0, //-1.2
  theta: 1, //0.8,
  dragCoeff: 0.02, //0.02
  timeStep : 20, //20
});

const setNodePosition = (el, text) => {
  const p = layout.getNodePosition(text)
  el.setAttribute('animation', 'property: position; to: ' + `${p.x} ${p.y} ${p.z}` +'; loop: false; dur: 500')
}

const addNode = (text = 'new node hahaha') => {
  var scene = document.querySelector('#scene')
  var el = document.createElement('a-text');

  g.addNode(text)
  
  el.setAttribute('color', randomColor())
  el.setAttribute('font','sourcecodepro')
  el.setAttribute('wrap-count','50')  
  el.setAttribute('side','double')
  el.setAttribute('value', text)
  
  setNodePosition(el, text)
  el.setAttribute('id', 'node-' + getNodes().length)
  el.setAttribute('class', 'node')
  
  scene.appendChild(el)
  
  setTimeout(() => toggleCamera(), 500)
}
const removeNode = () => {
    const node = getNodes()[index-1]
    console.log(node, index-1)
    var scene = document.querySelector('#scene')
    if (node){
      scene.removeChild(node)
      toggleCamera()
    }
}

let index = 0;
let newNodeText='';

const toggleCamera = () => {
  const nodes = getNodes() 
  // updateIndex()
  updateHud()
  
  // if (nodes.length > 0){
  //   //console.log(nodes.length, index, nodes[index].object3D.position,nodes[index].attributes.value )
    
  //   var campos = [ nodes[index].object3D.position.x, nodes[index].object3D.position.y,  nodes[index].object3D.position.z + 3.0 ].join(' ')
  //   document.querySelector('#camera')
  //     .setAttribute('animation', 'property: position; to: ' + campos +'; loop: false; dur: 500')
  //     //.setAttribute('animation', 'property: rotation; to: 0 360 0; loop: true; dur: 5000')
  //   index++
  // }
}
const moveCameraZ = (offset) => {
  const camera = document.querySelector('#camera').object3D
  const pos = [ camera.position.x, camera.position.x, camera.position.z + offset ].join(' ')
  
  document.querySelector('#camera').setAttribute('animation', 'property: position; to: ' + pos +'; loop: false; dur: 500')
}
// const updateIndex = () => index = index >= getNodes().length ? 0 : index 
const updateHud = () => {
  // const currentNode = '[' + (getNodes().length > 0 ? ((index+1) + '|' + getNodes().length) : 0) + ']'
  // document.querySelector('#hud')
  //   .setAttribute('value', currentNode + '> ' + newNodeText || '')
}

const removeLastCharFromNewNodeText = () => { newNodeText=newNodeText.substring(0, newNodeText.length-1); updateHud() }
const addCharacterToNewNodeText = (ch) => { newNodeText+=ch; updateHud() }
const clearNewNodeText = () => { newNodeText = ''; updateHud() }

const getNodes = () => document.querySelectorAll('.node')
// const saveNodes = async () => {
//   const rawResponse = await fetch('https://atm-challange.glitch.me/nodes', {
//     method: 'POST',
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify([...getNodes()].map(n=> n.attributes.value.value))
//   });
//   console.log(rawResponse);
// }

// const updateNodePositions = () => {
//   [...getNodes()].map(n => {
//     setNodePosition(n, n.attributes.value.value)
//   })
// }


const init = () => {
  // http://api.conceptnet.io/relatedness?node1=/c/en/tea_kettle&node2=/c/en/coffee_pot
  //,'github.com/anvaka/dotparser', 'github.com/sverweij/dependency-cruiser', https://www.wordsapi.com/, http://conceptnet5.media.mit.edu/, https://synonim.net
  // ['see thoughts','brain.js', 'markdown support', 'adding nodes', 'links/edges', 'express.js', 'storage', 'colors', 'categorization', 'force-directed graph layout']
  fetch("https://atm-challange.glitch.me/nodes/")
    .then(response => { console.log(response); return response.json() })
    .then(json => {
      json.map(text => addNode(text))
    })
   
  document.addEventListener('keydown', e => {
    e.preventDefault()
    console.log(e.key)
    switch (e.key){  
      case 'Tab':
        toggleCamera()
        break
      case 'Enter':
        if (newNodeText){
          getCoins(newNodeText).map(n => addNode(n))
        }
        clearNewNodeText()
        break 
      case 'Backspace':            
        removeLastCharFromNewNodeText()
        break
      case 'Delete':
         removeNode()
        break
      case 'ArrowUp':
        moveCameraZ(1)
        break;
      case 'ArrowDown':
        moveCameraZ(-1)
        break;
      case 'F2':
        // saveNodes()
        break
      case 'F3':
        layout.step()
        console.log(layout.getGraphRect())
        break        
      case 'F4':
        // updateNodePositions()
        break           
      case 'F5':
        document.querySelector('#camera')
          .setAttribute('animation', 'property: rotation; to: 0 360 0; loop: true; easing: linear; dur: 15000')
        break
      case 'F6':
        document.querySelector('#camera')
          .setAttribute('animation', 'property: rotation; to: 0 0 0; loop: false; dur: 500')
        break   
      case 'F8':
        const p = layout.getGraphRect()
        const middle = `${p.x1+p.x2} ${p.y1+p.y2} ${p.z1+p.z2}`
        //console.log(middle)
        document.querySelector('#camera')
          .setAttribute('animation', 'property: position; to: ' + middle  + '; dur: 500')
        break           
      default:
        if (e.key.length==1)// (e.key.match(/^[a-z0-9]$/i))          
        addCharacterToNewNodeText(e.key)
    }

    return false
  });
  
  // window.g = g
  // window.layout = layout
}

init()

setTimeout(() => { 
  layout.step() 
  // updateNodePositions()
}, 300)

