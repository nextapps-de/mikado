# Concepts of reconcile

I want to share some of my concepts how to find the shortest path to re-arrange dom nodes for re-using in keyed mode. I don't know if they already exist, but the implementation which I have seen are too complicated for what they try to do. My first thought was, that could be done simpler. So I start from scratch with pen and paper.

These concept are just a basic start and of course do not provide all the edge cases. Also the 3 examples are very basic (no inserts, no removes) to make things easier to understand.

## 1. Offset List

Assume array A should be re-arranged to array B:
```js
const a = [1, 2, 3, 4, 5];
const b = [2, 3, 4, 1, 5];
```

Loop through a and fill a blank array with offsets (`target_pos - current_pos`):
```js
const a = [1,  2,  3,  4, 5];
const x = [3, -1, -1, -1, 0];
const b = [2,  3,  4,  1, 5];
```

When you skip all zero values and all values which are equal in a row, then just the changes will remain:
```js
const a = [1,  2,  3,  4, 5];
const x = [3               ];
const b = [2,  3,  4,  1, 5];
```

Which means shift ___1___ from ___a___ forward for ___3___ indexes and you are ready.

Lets take another example (reversed), same concept:
```js
const a = [1, 2, 3, 4, 5];
const b = [1, 5, 2, 3, 4];
```

```js
const a = [1, 2, 3, 4,  5];
const x = [0, 1, 1, 1, -3];
const b = [1, 5, 2, 3,  4];
```

```js
const a = [1, 2, 3, 4,  5];
const x = [            -3];
const b = [1, 5, 2, 3,  4];
```

Shift the last 3 indexes before and you are ready.

A bit more complex example:

```js
const a = [1, 2, 3, 4, 5, 6, 7, 8,  9];
const x = [4, 0, 0, 0, 1, 1, 2, 0, -8];
const b = [9, 2, 3, 4, 1, 5, 6, 8,  7];
```

```js
const a = [1, 2, 3, 4, 5, 6, 7, 8,  9];
const x = [4,                2,    -8];
const b = [9, 2, 3, 4, 1, 5, 6, 8,  7];
```

3 steps are the shortest path for the re-arrangement above.

## 2. Longest Distance

Assume array A should be re-arranged to array B:
```js
const a = [1, 2, 3, 4, 5];
const b = [2, 3, 4, 1, 5];
```

In a loop: get the offset of an item from a[index] in b, then also get the offset from b[index] in b (same index!), take the longest distance and apply the move:

The offset from a[0] in list b is 3, the offset from b[0] in list a is 1, so move a[0] forward:
```js
const a = [2, 3, 4, 1, 5];
```

Lets take another example (reversed), same concept:
```js
const a = [1, 2, 3, 4, 5];
const b = [1, 5, 2, 3, 4];
```

The offset from a[0] in list b is 0, the offset from b[0] in list a is also 0, so skip.<br>
The offset from a[1] in list b is 1, the offset from b[1] in list a is 3, so move b[1] backwards:
```js
const a = [1, 5, 2, 3, 4];
```

A bit more complex example:

```js
const a = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const b = [9, 2, 3, 4, 1, 5, 6, 8, 7];
```

The offset from a[0] in list b is 4, the offset from b[0] in list a is 8, so move b[0] backwards:
```js
const a = [9, 1, 2, 3, 4, 5, 6, 7, 8];
const b = [9, 2, 3, 4, 1, 5, 6, 8, 7];
```

The offset from a[1] in list b is 3, the offset from b[1] in list a is 1, so move a[1] forward:
```js
const a = [9, 2, 3, 4, 1, 5, 6, 7, 8];
const b = [9, 2, 3, 4, 1, 5, 6, 8, 7];
```
Skip the next ones because they are equal.

The offset from a[7] in list b is 1, the offset from b[7] in list a is 1, so move one of both:
```js
const a = [9, 2, 3, 4, 1, 5, 6, 8, 7];
const b = [9, 2, 3, 4, 1, 5, 6, 8, 7];
```

This concept also just uses 3 moves.

## 3. 3-Way-Splice

<!--This concept is used by Mikado (not released yet) because it has some advantages in performance over the other ones. -->
Basically this concept mimics the behavior of an array which is very close to the behavior of a nodelist.

Just start with the more complex example:
```js
const a = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const b = [9, 2, 3, 4, 1, 5, 6, 8, 7];
```

Look where item b[0] is included in ___a___, pick this item from ___a___:
```js
const a = [1, 2, 3, 4, 5, 6, 7, 8]; // --> 9
const b = [9, 2, 3, 4, 1, 5, 6, 8, 7];
```

and move this to the target index, at the same time pick the item from ___a___ which is actually on this index:
```js
const a = [9, 2, 3, 4, 5, 6, 7, 8]; //  9 <-- --> 1
const b = [9, 2, 3, 4, 1, 5, 6, 8, 7];
```

put these item to the target index:
```js
const a = [9, 2, 3, 4, 1, 5, 6, 7, 8]; //  1 <--
const b = [9, 2, 3, 4, 1, 5, 6, 8, 7];
```

Skip equal indexes.<br>

The last 2 items could solved simply by some kind of look-ahead in one turn. But lets do the same 3-way-strategy just for demonstration:

Pick ___8___ from ___a___:
 ```js
 const a = [9, 2, 3, 4, 1, 5, 6, 7]; //  --> 8
 const b = [9, 2, 3, 4, 1, 5, 6, 8, 7];
 ```
 
Place this to the target index and also get the item on this index before:
```js
const a = [9, 2, 3, 4, 1, 5, 6, 8]; //  8 <-- --> 7
const b = [9, 2, 3, 4, 1, 5, 6, 8, 7];
```

Put the item to the target index:
```js
const a = [9, 2, 3, 4, 1, 5, 6, 8, 7]; //  7 <--
const b = [9, 2, 3, 4, 1, 5, 6, 8, 7];
```

Array.splice can remove and include in one turn, that improves performance. Also this concepts loops through ___b___ instead of ___a___ and requires less loop steps and also makes look-ahead simpler.
