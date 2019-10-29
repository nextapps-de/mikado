
import {customDirectives, domc} from './index.js'

function setup(node, directive = "item of data") {
    const parent = node.parentNode
    parent.textContent = ""
    let nodes = []

    const ofIdx = directive.indexOf(' of ')
    const dataKey = directive.slice(ofIdx + 4)
    const itemKey = directive.slice(0, ofIdx)

    const template = domc(node)

    return scope => {
        const data = scope[dataKey]

        if (data.length === 0) {
            parent.textContent = ""
            nodes.length = 0
            return
        }
        if (nodes.length > data.length) {
            for(let i = data.length; i < nodes.length; i++) {
                parent.removeChild(nodes[i])
            }
            nodes.length = data.length
        }

        const localScope = Object.assign({}, scope)
        for(let i = 0; i < data.length; i++) {
            localScope[itemKey] = data[i]
            if (nodes[i]) {
                nodes[i].update(localScope)
            } else {
                nodes[i] = template.createInstance(localScope)
                parent.appendChild(nodes[i])
            }
        }
    }
}
customDirectives.map = setup
