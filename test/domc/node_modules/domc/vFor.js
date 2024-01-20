
import {customDirectives, domc} from './index.js'

function setup(node, directive = "item of data") {
    const parent = node.parentNode
    parent.textContent = ""
    let renderedValues = []

    const ofIdx = directive.indexOf(' of ')
    const dataKey = directive.slice(ofIdx + 4)
    const itemKey = directive.slice(0, ofIdx)

    const template = domc(node)

    return scope => {
        const localScope = Object.assign({}, scope)
        const data = scope[dataKey]
        reconcile(
            parent, 
            renderedValues,
            data,
            item => {
                localScope[itemKey] = item
                const node = template.createInstance(localScope)
                return node
            },
            (node, item) => {
                localScope[itemKey] = item
                node.update(localScope)
            })
        renderedValues = data.slice(0)
    }
}
customDirectives.for = setup

// This is almost straightforward implementation of reconcillation algorithm
// based on ivi documentation:
// https://github.com/localvoid/ivi/blob/2c81ead934b9128e092cc2a5ef2d3cabc73cb5dd/packages/ivi/src/vdom/implementation.ts#L1366
// With some fast paths from Surplus implementation:
// https://github.com/adamhaile/surplus/blob/master/src/runtime/content.ts#L86
//
// How this implementation differs from others, is that it's working with data directly,
// without maintaining nodes arrays, and uses dom props firstChild/lastChild/nextSibling
// for markers moving.
function reconcile(parent, renderedValues, data, createFn, noOp) {
    // Fast path for clear
    if (data.length === 0) {
        parent.textContent = ""
        return
    }

    // Fast path for create
    if (renderedValues.length === 0) {
        let node
        for(let i = 0, len = data.length; i < len; i++) {
            node = createFn(data[i])
            parent.appendChild(node)
        }
        return
    }

    let prevStart = 0,
        newStart = 0,
        loop = true,
        prevEnd = renderedValues.length-1, newEnd = data.length-1,
        a, b,
        prevStartNode = parent.firstChild,
        newStartNode = prevStartNode,
        prevEndNode = parent.lastChild,
        newEndNode = prevEndNode,
        afterNode
    
    fixes: while(loop) {
        loop = false
        let _node

        // Skip prefix
        a = renderedValues[prevStart], b = data[newStart]
        while(a === b) {
            noOp(prevStartNode, b)
            prevStart++
            newStart++
            newStartNode = prevStartNode = prevStartNode.nextSibling
            if (prevEnd < prevStart || newEnd < newStart) break fixes
            a = renderedValues[prevStart]
            b = data[newStart]
        }

        // Skip suffix
        a = renderedValues[prevEnd], b = data[newEnd]
        while(a === b) {
            noOp(prevEndNode, b)
            prevEnd--
            newEnd--
            afterNode = prevEndNode
            newEndNode = prevEndNode = prevEndNode.previousSibling
            if (prevEnd < prevStart || newEnd < newStart) break fixes
            a = renderedValues[prevEnd]
            b = data[newEnd]
        }

        // Fast path to swap backward
        a = renderedValues[prevEnd], b = data[newStart]
        while(a === b) {
            loop = true
            noOp(prevEndNode, b)
            _node = prevEndNode.previousSibling
            parent.insertBefore(prevEndNode, newStartNode)
            newEndNode = prevEndNode = _node
            newStart++
            prevEnd--
            if (prevEnd < prevStart || newEnd < newStart) break fixes
            a = renderedValues[prevEnd]
            b = data[newStart]
        }

        // Fast path to swap forward
        a = renderedValues[prevStart], b = data[newEnd]
        while(a === b) {
            loop = true
            noOp(prevStartNode, b)
            _node = prevStartNode.nextSibling
            parent.insertBefore(prevStartNode, afterNode)
            prevStart++
            afterNode = newEndNode = prevStartNode
            prevStartNode = _node
            newEnd--
            if (prevEnd < prevStart || newEnd < newStart) break fixes
            a = renderedValues[prevStart]
            b = data[newEnd]
        }
    }

    // Fast path for shrink
    if (newEnd < newStart) {
        if (prevStart <= prevEnd) {
            let next
            while(prevStart <= prevEnd) {
                if (prevEnd === 0) {
                    parent.removeChild(prevEndNode)
                } else {
                    next = prevEndNode.previousSibling    
                    parent.removeChild(prevEndNode)
                    prevEndNode = next
                }
                prevEnd--
            }
        }
        return
    }

    // Fast path for add
    if (prevEnd < prevStart) {
        if (newStart <= newEnd) {
            let node
            while(newStart <= newEnd) {
                node = createFn(data[newStart])
                parent.appendChild(node)
                newStart++
            }
        }
        return
    }

    // Positions for reusing nodes from current DOM state
    const P = new Array(newEnd + 1 - newStart)
    for(let i = newStart; i <= newEnd; i++) P[i] = -1

    // Index to resolve position from current to new
    const I = new Map()
    for(let i = newStart; i <= newEnd; i++) I.set(data[i], i)

    let reusingNodes = 0, toRemove = []
    for(let i = prevStart; i <= prevEnd; i++) {
        if (I.has(renderedValues[i])) {
            P[I.get(renderedValues[i])] = i
            reusingNodes++
        } else {
            toRemove.push(i)
        }
    }

    // Fast path for full replace
    if (reusingNodes === 0) {
        parent.textContent = ""
        let node
        for(let i = newStart; i <= newEnd; i++) {
            node = createFn(data[i])
            parent.appendChild(node)
        }
        return
    }

    // What else?
    const longestSeq = longestPositiveIncreasingSubsequence(P, newStart)

    // Collect nodes to work with them
    const nodes = []
    let tmpC = prevStartNode
    for(let i = prevStart; i <= prevEnd; i++) {
        nodes[i] = tmpC
        tmpC = tmpC.nextSibling
    }

    for(let i = 0; i < toRemove.length; i++) parent.removeChild(nodes[toRemove[i]])

    let lisIdx = longestSeq.length - 1, tmpD
    for(let i = newEnd; i >= newStart; i--) {
        if(longestSeq[lisIdx] === i) {
            afterNode = nodes[P[longestSeq[lisIdx]]]
            noOp(afterNode, data[i])
            lisIdx--
        } else {
            if (P[i] === -1) {
                tmpD = createFn(data[i])
            } else {
                tmpD = nodes[P[i]]
                noOp(data[i])
            }
            parent.insertBefore(tmpD, afterNode)
            afterNode = tmpD
        }
    }
}

// Picked from
// https://github.com/adamhaile/surplus/blob/master/src/runtime/content.ts#L368

// return an array of the indices of ns that comprise the longest increasing subsequence within ns
function longestPositiveIncreasingSubsequence(ns, newStart) {
    var seq = [],
        is  = [],
        l   = -1,
        pre = new Array(ns.length);

    for (var i = newStart, len = ns.length; i < len; i++) {
        var n = ns[i];
        if (n < 0) continue;
        var j = findGreatestIndexLEQ(seq, n);
        if (j !== -1) pre[i] = is[j];
        if (j === l) {
            l++;
            seq[l] = n;
            is[l]  = i;
        } else if (n < seq[j + 1]) {
            seq[j + 1] = n;
            is[j + 1] = i;
        }
    }

    for (i = is[l]; l >= 0; i = pre[i], l--) {
        seq[l] = i;
    }

    return seq;
}

function findGreatestIndexLEQ(seq, n) {
    // invariant: lo is guaranteed to be index of a value <= n, hi to be >
    // therefore, they actually start out of range: (-1, last + 1)
    var lo = -1,
        hi = seq.length;
    
    // fast path for simple increasing sequences
    if (hi > 0 && seq[hi - 1] <= n) return hi - 1;

    while (hi - lo > 1) {
        var mid = Math.floor((lo + hi) / 2);
        if (seq[mid] > n) {
            hi = mid;
        } else {
            lo = mid;
        }
    }

    return lo;
}
