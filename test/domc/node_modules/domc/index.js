// Synthetic Events

const nativeToSyntheticEvent = (event, name) => {
    const eventKey = `__${name}`
    let dom = event.target
    let fnargs = `__${name}Data`    
    while(dom !== null) {
        const eventHandler = dom[eventKey]
        if (eventHandler) {
           // if no function args then call handler with the event object itself
           if (dom[fnargs]){
              eventHandler(dom[fnargs])
           } 
           else {
              eventHandler(event)
           }
            return
        }
        dom = dom.parentNode
    }
}

const CONFIGURED_SYNTHETIC_EVENTS = {}
function setupSyntheticEvent(name) {
    if (CONFIGURED_SYNTHETIC_EVENTS[name]) return
    document.addEventListener(name, event => nativeToSyntheticEvent(event, name))
    CONFIGURED_SYNTHETIC_EVENTS[name] = true
}

// Core
//
// To speed up template compiler:
// - Reduce amount of fn calls, because every call has cost of allocating memory for new fn context.
//   Inline as much code as possible ot avoid calls.
// - Preallocate all variables at once in module context instead of fn arguments.
//   It reduces time to allocate context memory for functions that needed some arguments for every call.
//   Use Stack for handling arguments of nested/recursive calls.
// - String concatenation is faster than arr.join('')
// - arr[idx] is faster than arr.push, because it's not a function call,
//   therefore it doesn't need to allocate memory for new fn context
// - str[idx] and str.slice are faster than regex matching
//

function makeid() {
    const {possible, n} = makeid
    let alphaHex = n.toString(26).split(''), c, r = ''
    while(c = alphaHex.shift()) r += possible[parseInt(c, 26)]
    makeid.n++
    return r
}
makeid.possible = "abcdefghijklmnopqrstuvwxyz"
makeid.n = 0


export const customDirectives = {}

class Compiler {
    constructor() {
        this.varCode = 
        this.vdomCode = 
        this.compareCode = 
        this.refsCode = 
        this.directiveSetupCode = 
        this.directiveUpdateCode = ''

        this.scopeVars = {}
        this.component = null
    }

    // Inspired by walker: https://gist.github.com/cowboy/958000
    compile(root) {
        let skip = false, tmp, pathId = 'node', prevPathId, pahtIdLen, node = root, canIGoDeep
        canIGoDeep = this.codegen(node, pathId)
        if (canIGoDeep > 0) return
        pathId = ''
        do {
            if (!skip && (tmp = node.firstChild)) {
                if (tmp.nodeType === 3 && tmp.nodeValue.trim() === "") {
                    tmp.parentNode.removeChild(tmp)
                    continue
                }
                skip = false

                prevPathId = pathId
                pathId += '_f'
                this.varCode += `let ${pathId} = ${prevPathId || 'node'}.firstChild;\n` 
                
                canIGoDeep = this.codegen(tmp, pathId)
                if (canIGoDeep > 0) skip = true
            } else if (tmp = node.nextSibling) {
                if (tmp.nodeType === 3 && tmp.nodeValue.trim() === "") {
                    tmp.parentNode.removeChild(tmp)
                    continue
                }
                skip = false

                prevPathId = pathId
                pathId += '_n'
                this.varCode += `let ${pathId} = ${prevPathId || 'node'}.nextSibling;\n` 
                
                canIGoDeep = this.codegen(tmp, pathId)
                if (canIGoDeep > 0) skip = true
            } else {
                pahtIdLen = pathId.length
                if (pathId[pahtIdLen - 1] === 'n') {
                    pathId = pathId.slice(0, pathId.lastIndexOf('_f_n'))
                } else {
                   pathId = pathId.slice(0, pahtIdLen- 2) 
                }
                tmp = node.parentNode
                skip = true
            }
            node = tmp
            if (node === root) break
        } while (node)

        // this.codeopt()
    }

    codegen(node, pathId) {
        let nodeType = node.nodeType,
            tag = node.nodeName

        if (nodeType === 8) {
            const nodeData = node.nodeValue.trim()
            if (nodeData[0] === '#') {
                if (nodeData[1] === '#') {
                    this.directiveSetupCode += `for(let i = 0; i < scope.${nodeData.slice(2)}.length; i++) ${pathId}.parentNode.insertBefore(scope.${nodeData.slice(2)}[i], ${pathId});\n${pathId}.parentNode.removeChild(${pathId});\n`
                } else {
                    this.directiveSetupCode += `${pathId}.parentNode.replaceChild(scope.${nodeData.slice(1)}, ${pathId});\n`    
                }
            }
            return 0
        }
        
        if (nodeType !== 3) {

            // codegenAttributes
            if (node.attributes !== undefined) {
                let toBeRemoved = []
                for(let attr of node.attributes) {
                    let aname = attr.name
                    let avalue = attr.value

                    if (aname[0] === 'i' && aname[1] === 's') {
                        node.removeAttribute(aname)
                        if (pathId === 'node') {
                            this.component = customDirectives[avalue](node)
                        } else {
                            const vdomId = makeid()

                            this.directiveSetupCode += `let __${vdomId} = utils["${avalue}"](${pathId})(scope);\n${pathId}.parentNode.replaceChild(__${vdomId}, ${pathId});\n`
                            this.directiveUpdateCode += `  __${vdomId}.update(scope);\n`
                        }
                        return 1
                    }

                    if (aname[0] === 'v' && aname[1] === '-') {
                        node.removeAttribute(aname)

                        const directive = aname.slice(2)

                        const vdomId = makeid()

                        this.directiveSetupCode += `let __${vdomId} = utils.${directive}(${pathId}, "${avalue}");\n`
                        this.directiveUpdateCode += `    __${vdomId}(scope);\n`

                        return 1
                    }

                    if (aname[0] === 'o' && aname[1] === 'n') {

                        const eventType = aname.slice(2)
                        setupSyntheticEvent(eventType)

                        const reactiveValue = avalue
                        const parenIdx = reactiveValue.indexOf("(")
                        
                        let eventHandler, eventHandlerArgs
                        if (parenIdx >= 0) {
                            eventHandler = reactiveValue.slice(0, parenIdx)
                            const eventHandlerArgsStr = reactiveValue.slice(parenIdx + 1, reactiveValue.length - 1)
                            if (eventHandlerArgsStr.length > 0) {
                                eventHandlerArgs = eventHandlerArgsStr.split(',')
                            } else {
                                eventHandlerArgs = []
                            }
                        } else {
                            eventHandler = reactiveValue
                            eventHandlerArgs = []
                        }

                        if (eventHandlerArgs.length > 0) {
                            const vdomId = makeid()
                            this.refsCode += `${pathId}.__${eventType} = scope.${eventHandler};\n`
                            this.vdomCode += `    vdom.${vdomId} = ${eventHandlerArgs};\n`    
                            this.compareCode +=`    if (current.${vdomId} !== vdom.${vdomId}) ${pathId}.__${eventType}Data = vdom.${vdomId};\n`
                        } else {
                            this.refsCode += `${pathId}.__${eventType} = scope.${eventHandler};\n`
                        }

                        toBeRemoved.push(aname)

                        for(let i = 0, code, token; i < eventHandlerArgs.length; i++) {
                            token = eventHandlerArgs[i]
                            code = token.charCodeAt(0)
                            if (code >= 97 && code <= 122) {
                                if (token.indexOf('.') >= 0) {
                                    this.scopeVars[token.slice(0, token.indexOf('.'))] = true    
                                } else {
                                    this.scopeVars[token] = true
                                }
                            }
                        }
                    } else if (avalue.indexOf("{{") >= 0) {
                        if (aname === 'class') {
                            const vdomId = makeid()

                            this.vdomCode += `    vdom.${vdomId} = \`${avalue.replace(/{{/g, '${').replace(/}}/g, '}')}\`;\n`
                            this.compareCode +=`    if (current.${vdomId} !== vdom.${vdomId}) ${pathId}.className = vdom.${vdomId};\n`

                        } else if (aname === 'style') {
                            let token = avalue.replace('{{', '').replace('}}', '').trim()

                            this.directiveSetupCode += 'let __style = node.style;\n'
                            this.directiveUpdateCode += `    let scopeStyle = scope.${token};\n    for(let key in scopeStyle) if(scopeStyle[key] !== __style[key]) __style[key] = scopeStyle[key];\n`

                        } else {
                            const vdomId = makeid()

                            this.vdomCode += `    vdom.${vdomId} = \`${avalue.replace(/{{/g, '${').replace(/}}/g, '}')}\`;\n`
                            this.compareCode +=`    if (current.${vdomId} !== vdom.${vdomId}) ${pathId}.setAttribute("${aname}", vdom.${vdomId});\n`
                        }

                        let dIdx, eIdx, tokens
                        while((dIdx = avalue.indexOf('{{')) >= 0) {
                            eIdx = avalue.indexOf('}}')
                            tokens = avalue.slice(dIdx + 2, eIdx).split(/[\s\(\)]/g)
                            for(let i = 0, code, token; i < tokens.length; i++) {
                                token = tokens[i]
                                code = token.charCodeAt(0)
                                if (code >= 97 && code <= 122) {
                                    if (token.indexOf('.') >= 0) {
                                        this.scopeVars[token.slice(0, token.indexOf('.'))] = true    
                                    } else {
                                        this.scopeVars[token] = true
                                    }
                                }
                            }
                            avalue = avalue.slice(eIdx + 1)
                        }

                        toBeRemoved.push(aname)
                    }   
                }

                for(let aname of toBeRemoved) node.removeAttribute(aname)
            }
            // End codegenAttributes

        } else {

            // codegenText
            let nodeData = node.nodeValue.trim()

            if (nodeData.indexOf("{{") >= 0) {
                const vdomId = makeid()

                this.vdomCode += `    vdom.${vdomId} = \`${nodeData.replace(/{{/g, '${').replace(/}}/g, '}')}\`;\n`
                this.compareCode +=`    if (current.${vdomId} !== vdom.${vdomId}) ${pathId}.nodeValue = vdom.${vdomId};\n`

                node.nodeValue = ""

                let dIdx, eIdx, tokens
                while((dIdx = nodeData.indexOf('{{')) >= 0) {
                    eIdx = nodeData.indexOf('}}')
                    tokens = nodeData.slice(dIdx + 2, eIdx).split(/[\s\(\)]/g)
                    for(let i = 0, code, token; i < tokens.length; i++) {
                        token = tokens[i]
                        code = token.charCodeAt(0)
                        if (code >= 97 && code <= 122) {
                            if (token.indexOf('.') >= 0) {
                                this.scopeVars[token.slice(0, token.indexOf('.'))] = true    
                            } else {
                                this.scopeVars[token] = true
                            }
                        }
                    }
                    nodeData = nodeData.slice(eIdx + 1)
                }
            }
            // End codegenText

        }

        if (tag.indexOf('-') > 0) {
            if (pathId === 'node') {
                this.component = customDirectives[tag.toLowerCase()](node)
            } else {
                const vdomId = makeid()

                this.directiveSetupCode += `let __${vdomId} = utils["${tag.toLowerCase()}"](${pathId})(scope);\n${pathId}.parentNode.replaceChild(__${vdomId}, ${pathId});\n`
                this.directiveUpdateCode += `  __${vdomId}.update(scope);\n`
            }
            return 1
        }

        return 0
    }

    createFn() {
        if (this.component) return this.component

        let argsStr = ''
        for(let arg of Object.keys(this.scopeVars)) argsStr += arg + ","   
        return Function("scope", "node", "utils", "rehydrate",
            'if (rehydrate !== true) node = node.cloneNode(true);\n' + this.varCode + '\n' + this.refsCode + '\n' + this.directiveSetupCode + '\n' +
            `let current = {};\nnode.update = function(scope) {\n${this.vdomCode.length > 0 ? `    const {${argsStr}} = scope;\n\n    const vdom = {};\n${this.vdomCode}\n${this.compareCode}\n    current = vdom;\n` : ''}\n${this.directiveUpdateCode}}\n` +
            'return node;')
    }
}
 
class Template {
    constructor(dom, createFn) {
        this.dom = dom
        this.create = createFn
    }
    createInstance(scope) {
        const node = this.create(scope, this.dom, customDirectives)
        node.update(scope)
        return node
    }
    rehydrate(scope) {
        this.create(scope, this.dom, customDirectives, true)
        this.dom.update(scope)
    }
}

export function domc(dom) {
    const c = new Compiler()
    c.compile(dom)
    const createFn = c.createFn()
    // console.debug({createFn, dom})
    return new Template(dom, createFn)
}

domc.customDirectives = customDirectives

const compilerTemplate = document.createElement('template')
domc.component = function(tag, templateObj) {
    let template, onCreate, onUpdate
    if (typeof templateObj === 'string') {
        template = templateObj
    } else {
        template = templateObj.template
        onCreate = templateObj.create
        onUpdate = templateObj.update
    }

    compilerTemplate.innerHTML = template.trim()
    let cNode = domc(compilerTemplate.content.firstChild)

    function createFn(orig) {
        let mode = 1

        let hasntLocalState = onCreate === undefined && onUpdate === undefined
        let hasntAttrs = orig.attributes === undefined || orig.attributes.length === 0
        let hasntChildren = orig.firstChild === null || (orig.childNodes.length === 1 && orig.firstChild.nodeType === 3 && orig.firstChild.nodeValue.trim() === '')

        if (hasntLocalState && hasntAttrs && hasntChildren) mode = 0

        if (mode === 0) return Function("cNode", `
            return function(scope) { return cNode.createInstance(scope) }
        `)(cNode)

        let varsFn
        if (!hasntAttrs) {
            let varsCode = 'const vs = {};\n'
            for(let attr of orig.attributes) {
                varsCode += `vs["${attr.name}"] = scope["${attr.value}"];\n`
            }
            varsFn = Function("scope", varsCode + 'return vs;\n')
        }

        let children
        if (!hasntChildren) {
            children = Array.from(orig.childNodes)
        }

        return scope => {
            let node,
                updateFn

            let localScope = Object.assign({
                nodeRender: () => {
                    if (onUpdate) Object.assign(localScope, onUpdate(localScope))
                    updateFn(localScope)
                }
            }, scope)

            if (varsFn) Object.assign(localScope, varsFn(localScope))
            
            localScope.children = children

            if (onCreate) Object.assign(localScope, onCreate(localScope))

            localScope.node = node = cNode.createInstance(localScope)
            updateFn = node.update

            node.update = function(scope) {
                // Triple merge to make local component vars not be overwritten
                Object.assign(localScope, scope, localScope)
                if (varsFn) Object.assign(localScope, varsFn(localScope), localScope)
                if (onUpdate) Object.assign(localScope, onUpdate(localScope))
                updateFn(localScope)
            }

            return node
        }
    }

    domc.customDirectives[tag] = createFn
}

domc.app = function(template) {
    compilerTemplate.innerHTML = template.trim()
    let cNode = domc(compilerTemplate.content.firstChild)

    return function(scope) {
        let node
        scope.render = () => node.update(scope)
        return node = cNode.createInstance(scope)
    }
}

export default domc
