/////////////////////////////////////////////
// https://adventofcode.com/2022/day/1/input

$0.textContent.split('\n\n')
    .map(x => x.split('\n').reduce((acc, x) => acc+Number(x), 0))
    .sort((a, b) => b-a)[0]

// > 69289

/////////
// step2

$0.textContent.split('\n\n')
    .map(x => x.split('\n').reduce((acc, x) => acc+Number(x), 0))
    .sort((a, b) => b-a)
    .slice(0, 3)
    .reduce((acc, x) => acc+x, 0)

// > 205615

/////////////////////////////////////////////
// https://adventofcode.com/2022/day/2/input

$0.textContent.split('\n').filter(x => x !== '')
    .map(x => x.split(' '))
    .map(x => {
        const other = x[0] === 'A' ? 'pierre' : (x[0] === 'B' ? 'papier' : 'ciseau');
        const me = x[1] === 'X' ? 'pierre' : (x[1] === 'Y' ? 'papier' : 'ciseau');
        const ptsForChoice = me === 'pierre' ? 1 : (me === 'papier' ? 2 : 3);
        
        let ptsForVictory;
        if(me === other) { 
            ptsForVictory = 3; 
        } else if(me === 'pierre') {
            ptsForVictory = (other === 'papier') ? 0 : 6;
        } else if(me === 'papier') {
            ptsForVictory = (other === 'pierre') ? 6 : 0;
        } else if(me === 'ciseau') {
            ptsForVictory = (other === 'pierre') ? 0 : 6;
        }
        
        return ptsForChoice + ptsForVictory;
    })
    .reduce((acc, x) => (acc + x), 0)

// > 13675

/////////
// step2

$0.textContent.split('\n').filter(x => x !== '')
    .map(x => x.split(' '))
    .map(x => {
        const other = x[0] === 'A' ? 'pierre' : (x[0] === 'B' ? 'papier' : 'ciseau');
        const wantedResult = x[1] === 'X' ? 'defaite' : (x[1] === 'Y' ? 'nul' : 'victoire');
        const ptsForVictory = wantedResult === 'defaite' ? 0 : (wantedResult === 'nul' ? 3 : 6);
        
        let me;
        if(wantedResult === 'nul') { 
            me = other; 
        } else if(other === 'pierre') {
            me = (wantedResult === 'victoire') ? 'papier' : 'ciseau';
        } else if(other === 'papier') {
            me = (wantedResult === 'victoire') ? 'ciseau' : 'pierre';
        } else if(other === 'ciseau') {
            me = (wantedResult === 'victoire') ? 'pierre' : 'papier';
        }
        const ptsForChoice = me === 'pierre' ? 1 : (me === 'papier' ? 2 : 3);
        
        return ptsForChoice + ptsForVictory;
    })
    .reduce((acc, x) => (acc + x), 0)

// > 14184

/////////////////////////////////////////////
// https://adventofcode.com/2022/day/3/input

$0.textContent.split('\n').filter(x => x !== '')
    .map(x => ([x.substr(0, x.length/2).split('').sort().join(''), x.substr(x.length/2, x.length/2).split('').sort().join('')]))
    .map(x => {
        const a = new Set(x[0]);
        const b = new Set(x[1]);
        const getPrio = (x) => 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.indexOf(x)+1;

        const z = [...a].find(x => b.has(x))
        return getPrio(z);
    })
    .reduce((acc, x) => acc+x, 0);

// > 8153

/////////
// step2

$0.textContent.split('\n').filter(x => x !== '')
    .reduce((acc, item) => {
        if(!acc[acc.length-1] || acc[acc.length-1].length >= 3) {
            acc.push([item]);
        } else {
            acc[acc.length-1].push(item);
        }
        return acc;
    }, [])
    .map(x => {
        const a = new Set(x[0]);
        const b = new Set(x[1]);
        const c = new Set(x[2]);
        const getPrio = (x) => 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.indexOf(x)+1;

        const z = [...a].find(x => b.has(x) && c.has(x))
        return getPrio(z);
    })
    .reduce((acc, x) => acc+x, 0);

// > 2342

/////////////////////////////////////////////
// https://adventofcode.com/2022/day/4/input

$0.textContent.split('\n').filter(x => x !== '')
    .map(x => x.split(','))
    .map(x => ({a: x[0].split('-').map(Number), b: x[1].split('-').map(Number)}))
    .filter(({a: [s1, e1], b: [s2, e2]}) => (s1 <= s2 && e2 <= e1) || (s2 <= s1 && e1 <= e2))
    .length

// > 582

/////////
// step2

$0.textContent.split('\n').filter(x => x !== '')
    .map(x => x.split(','))
    .map(x => ({a: x[0].split('-').map(Number), b: x[1].split('-').map(Number)}))
    .filter(({a: [s1, e1], b: [s2, e2]}) => !(e1 < s2 || s1 > e2))
    .length

// > 893

/////////////////////////////////////////////
// https://adventofcode.com/2022/day/5/input

$0.textContent.split('\n').filter(x => x !== '')
    .reduce((acc, line, index) => {
        if(index <= 8) acc[0].push(line);
        else           acc[1].push(line);
        return acc;
    }, [[], []])
    .map((x, i) => {
        if(i === 0) {
            const harbor = x.pop().match(/.{1,4}/g).map(Number).reduce((acc, num) => {
                acc[num] = {num, stacks: []};
                return acc;
            }, {});
            x.forEach(line => {
                const columns = line.match(/.{1,4}/g);
                columns.forEach((column, index) => {
                    if(column.trim() !== '') {
                        harbor[index+1].stacks.push(column.trim().substr(1, 1));
                    }
                });
            });
            return harbor;
        }
        return x.map(y => {
            const arr = y.split(' ');
            return {nb: Number(arr[1]), from: Number(arr[3]), to: Number(arr[5])}
        });
    })
    .reduce((acc, x, i) => {
        if(i === 0) acc[0].harbor = x;
        else        acc[0].process = x;
        return acc;
    }, [{}])
    .map(x => {
        x.process.forEach(({nb, from, to}) => {
            while(nb > 0) {
                x.harbor[to].stacks.unshift( x.harbor[from].stacks.shift() );
                nb--;
            }
        });
        return x.harbor;
    })
    .map(x => Object.keys(x).map(y => x[y].stacks[0]).join(''))[0]

// > 'TWSGQHNHL'

/////////
// step2

$0.textContent.split('\n').filter(x => x !== '')
    .reduce((acc, line, index) => {
        if(index <= 8) acc[0].push(line);
        else           acc[1].push(line);
        return acc;
    }, [[], []])
    .map((x, i) => {
        if(i === 0) {
            const harbor = x.pop().match(/.{1,4}/g).map(Number).reduce((acc, num) => {
                acc[num] = {num, stacks: []};
                return acc;
            }, {});
            x.forEach(line => {
                const columns = line.match(/.{1,4}/g);
                columns.forEach((column, index) => {
                    if(column.trim() !== '') {
                        harbor[index+1].stacks.push(column.trim().substr(1, 1));
                    }
                });
            });
            return harbor;
        }
        return x.map(y => {
            const arr = y.split(' ');
            return {nb: Number(arr[1]), from: Number(arr[3]), to: Number(arr[5])}
        });
    })
    .reduce((acc, x, i) => {
        if(i === 0) acc[0].harbor = x;
        else        acc[0].process = x;
        return acc;
    }, [{}])
    .map(x => {
        x.process.forEach(({nb, from, to}) => {
            const moved = x.harbor[from].stacks.slice(0, nb);
            x.harbor[from].stacks = x.harbor[from].stacks.slice(nb);
            x.harbor[to].stacks.unshift(...moved);
        });
        return x.harbor;
    })
    .map(x => Object.keys(x).map(y => x[y].stacks[0]).join(''))[0]

// > 'JNRSCDWPP'

/////////////////////////////////////////////
// https://adventofcode.com/2022/day/6/input

$0.textContent.split('\n').filter(x => x !== '')
    .map(x => {
        const markerLength = 4;
        let indexMarker;
        for(let i = 0; i < x.length - markerLength; i++) {
            const fourChars = x.substr(i, markerLength);
            const isMarker = (new Set(fourChars)).size === markerLength;
            if(isMarker) {
                indexMarker = i + markerLength;
                break;
            }
        }
        return indexMarker;
    })[0]

// > 1566

/////////
// step2

$0.textContent.split('\n').filter(x => x !== '')
    .map(x => {
        const markerLength = 14;
        let indexMarker;
        for(let i = 0; i < x.length - markerLength; i++) {
            const fourChars = x.substr(i, markerLength);
            const isMarker = (new Set(fourChars)).size === markerLength;
            if(isMarker) {
                indexMarker = i + markerLength;
                break;
            }
        }
        return indexMarker;
    })[0]

// > 2265

/////////////////////////////////////////////
// https://adventofcode.com/2022/day/7/input

$0.textContent.split('\n').filter(x => x !== '')
    .map(x => {
        switch(true) {
            case x.startsWith('$ cd '): return {type: 'cd', path: x.substr(5)};
            case x.startsWith('$ ls'):  return {type: 'ls'};
            case x.startsWith('dir '):  return {type: 'list', elem: 'dir', name: x.substr(4)};
            default:                    return {type: 'list', elem: 'file', name: x.split(' ')[1], size: Number(x.split(' ')[0])};
        }
    })
    .reduce((acc, line) => {
        const latest = acc[acc.length - 1];
        switch(true) {
            case (line.type === 'ls'):                   acc.push({type: 'list', items: []}); break;
            case (!latest || line.type !== latest.type): acc.push({type: line.type, items: [line]}); break;
            default:                                     latest.items.push(line); break;
        }
        return acc;
    }, [])
    .reduce((acc, cmds) => {
        if(cmds.type === 'cd') {
            cmds.items.forEach(line => {
                switch(true) {
                    case (line.path === '/'):  acc.currentPath = ''; break;
                    case (line.path === '..'): acc.currentPath = acc.currentPath.split('/').splice(0, acc.currentPath.split('/').length - 1).join('/'); break;
                    default:                   acc.currentPath += `/${line.path}`; break;
                }
            });
        }
        else if(cmds.type === 'list') {
            cmds.items.forEach(line => {
                if(line.elem === 'file') acc.files.push({folder: acc.currentPath, name: line.name, size: line.size});
            });
        }
        return acc;
    }, {currentPath: '', files: []})
    .files
    .reduce((acc, file) => {
        const folders = file.folder.split('/');
        let path = '';
        folders.forEach(x => {
            path += (path === '/') ? x : `/${x}`;
            acc[0].set(path, acc[0].has(path) ? (acc[0].get(path) + file.size) : file.size);
        });
        return acc;
    }, [new Map()])
    .map(x => {
        return [...x].map(y => ({path: y[0], size: y[1]}))
            .filter(y => y.size <= 100_000)
            .reduce((acc, y) => acc+y.size, 0);
    })[0]

// > 1845346

/////////
// step2

$0.textContent.split('\n').filter(x => x !== '')
    .map(x => {
        switch(true) {
            case x.startsWith('$ cd '): return {type: 'cd', path: x.substr(5)};
            case x.startsWith('$ ls'):  return {type: 'ls'};
            case x.startsWith('dir '):  return {type: 'list', elem: 'dir', name: x.substr(4)};
            default:                    return {type: 'list', elem: 'file', name: x.split(' ')[1], size: Number(x.split(' ')[0])};
        }
    })
    .reduce((acc, line) => {
        const latest = acc[acc.length - 1];
        switch(true) {
            case (line.type === 'ls'):                   acc.push({type: 'list', items: []}); break;
            case (!latest || line.type !== latest.type): acc.push({type: line.type, items: [line]}); break;
            default:                                     latest.items.push(line); break;
        }
        return acc;
    }, [])
    .reduce((acc, cmds) => {
        if(cmds.type === 'cd') {
            cmds.items.forEach(line => {
                switch(true) {
                    case (line.path === '/'):  acc.currentPath = ''; break;
                    case (line.path === '..'): acc.currentPath = acc.currentPath.split('/').splice(0, acc.currentPath.split('/').length - 1).join('/'); break;
                    default:                   acc.currentPath += `/${line.path}`; break;
                }
            });
        }
        else if(cmds.type === 'list') {
            cmds.items.forEach(line => {
                if(line.elem === 'file') acc.files.push({folder: acc.currentPath, name: line.name, size: line.size});
            });
        }
        return acc;
    }, {currentPath: '', files: []})
    .files
    .reduce((acc, file) => {
        const folders = file.folder.split('/');
        let path = '';
        folders.forEach(x => {
            path += (path === '/') ? x : `/${x}`;
            acc[0].set(path, acc[0].has(path) ? (acc[0].get(path) + file.size) : file.size);
        });
        return acc;
    }, [new Map()])
    .map(x => [...x].map(y => ({path: y[0], size: y[1]})).sort((a ,b) => b.size - a.size))
    .map(x => {
        const maxSize = 70_000_000;
        const neededSize = 30_000_000;
        const usedSize = x[0].size;
        const freeSize = maxSize - usedSize;
        const missingSize = neededSize - freeSize;
        return x.findLast(y => y.size >= missingSize).size;
    })[0]

// > 3636703

/////////////////////////////////////////////
// https://adventofcode.com/2022/day/8/input

$0.textContent.split('\n\n').filter(x => x !== '')
    .map(x => {
        const lines = x.split('\n');
        const trees = [];

        for(let iLine = 0; iLine < lines.length; iLine++) {
            for(let iCol = 0; iCol < lines[iLine].length; iCol++) {
                const isEdge = Boolean(iLine === 0 || iLine === lines.length - 1 || iCol === 0 || iCol === lines[iLine].length - 1);
                trees.push({
                    position:   {x: iCol, y: iLine},
                    value:      Number(lines[iLine][iCol]),
                    isEdge:     isEdge,
                    env: isEdge || {
                        left:   lines[iLine].substring(0, iCol),
                        right:  lines[iLine].substring(iCol+1),
                        top:    lines.slice(0, iLine).map(l => l[iCol]).join(''),
                        bottom: lines.slice(iLine+1).map(l => l[iCol]).join(''),
                    },
                });
            }
        }

        return trees;
    })
    .map(trees => {
        const isVisible = (arr, v) => arr.split('').map(Number).every(x => x < v);
        
        return trees.filter(tree => tree.isEdge || isVisible(tree.env.left, tree.value) || isVisible(tree.env.right, tree.value) || isVisible(tree.env.top, tree.value) || isVisible(tree.env.bottom, tree.value));
    })
    [0].length

// > 1763

/////////
// step2

$0.textContent.split('\n\n').filter(x => x !== '')
    .map(x => {
        const lines = x.split('\n');
        const trees = [];

        for(let iLine = 0; iLine < lines.length; iLine++) {
            for(let iCol = 0; iCol < lines[iLine].length; iCol++) {
                const isEdgeLeft = Boolean(iCol === 0);
                const isEdgeRight = Boolean(iCol === lines[iLine].length - 1);
                const isEdgeTop = Boolean(iLine === 0);
                const isEdgeBottom = Boolean(iLine === lines.length - 1);
                trees.push({
                    position:   {x: iCol, y: iLine},
                    value:      Number(lines[iLine][iCol]),
                    isEdge:     isEdgeLeft || isEdgeRight || isEdgeTop || isEdgeBottom,
                    env: {
                        left:   isEdgeLeft ?   '' : lines[iLine].substring(0, iCol).split('').reverse().join(''),
                        right:  isEdgeRight ?  '' : lines[iLine].substring(iCol+1),
                        top:    isEdgeTop ?    '' : lines.slice(0, iLine).map(l => l[iCol]).reverse().join(''),
                        bottom: isEdgeBottom ? '' : lines.slice(iLine+1).map(l => l[iCol]).join(''),
                    },
                });
            }
        }

        return trees;
    })
    .map(trees => {
        const isVisible = (arr, v) => arr.split('').map(Number).every(x => x < v);
        
        return trees.filter(tree => tree.isEdge || isVisible(tree.env.left, tree.value) || isVisible(tree.env.right, tree.value) || isVisible(tree.env.top, tree.value) || isVisible(tree.env.bottom, tree.value));
    })
    .map(trees => {
        const getScore = (tree) => {
            const getDirScore = (str, max) => {
                const arr = str.split('').map(Number);
                const index = arr.findIndex((x, i) => x >= max || i === arr.length-1);
                return arr.slice(0, index+1).length;
            };
            
            return getDirScore(tree.env.top, tree.value) * getDirScore(tree.env.right, tree.value) * getDirScore(tree.env.bottom, tree.value) * getDirScore(tree.env.left, tree.value);
        };

        return trees.map(tree => ({...tree, score: getScore(tree)})).sort((a, b) => b.score - a.score);
    })
    [0][0].score

// > 671160

/////////////////////////////////////////////
// https://adventofcode.com/2022/day/9/input

$0.textContent.split('\n').filter(x => x !== '')
    .map(x => ({dir: x.split(' ')[0], moves: Number(x.split(' ')[1])}))
    .reduce((acc, item, index) => {
        if(index === 0) {
            acc.counter.add(`${acc.tail.x}-${acc.tail.y}`, true);
        }
        
        const isAdjacent = (a, b) => b.x >= a.x-1 && b.x <= a.x+1 && b.y >= a.y-1 && b.y <= a.y+1;
        
        for(let i = 0; i < item.moves; i++) {
            switch(item.dir) {
                case 'U': acc.head.y--; break;
                case 'R': acc.head.x++; break;
                case 'D': acc.head.y++; break;
                case 'L': acc.head.x--; break;
            }
            if(!isAdjacent(acc.head, acc.tail)) {
                switch(true) {
                    case acc.tail.x === acc.head.x:
                        acc.tail.y = (acc.tail.y > acc.head.y) ? acc.tail.y-1 : acc.tail.y+1;
                        break;
                    case acc.tail.y === acc.head.y:
                        acc.tail.x = (acc.tail.x > acc.head.x) ? acc.tail.x-1 : acc.tail.x+1;
                        break;
                    default:
                        acc.tail.x = (acc.tail.x > acc.head.x) ? acc.tail.x-1 : acc.tail.x+1;
                        acc.tail.y = (acc.tail.y > acc.head.y) ? acc.tail.y-1 : acc.tail.y+1;
                        break;
                }
                acc.counter.add(`${acc.tail.x}-${acc.tail.y}`, true);
            }
        }

        return acc;
    }, {
        counter: new Set(),
        head: {x: 0, y: 4},
        tail: {x: 0, y: 4},
    })
    .counter.size

// > 5874

/////////
// step2

$0.textContent.split('\n').filter(x => x !== '')
    .map(x => ({dir: x.split(' ')[0], moves: Number(x.split(' ')[1])}))
    .reduce((acc, item, index) => {
        if(index === 0) {
            acc.counter.add(`${acc.knots[acc.knots.length - 1].x}-${acc.knots[acc.knots.length - 1].y}`, true);
        }
        
        const isAdjacent = (a, b) => b.x >= a.x-1 && b.x <= a.x+1 && b.y >= a.y-1 && b.y <= a.y+1;
        
        for(let i = 0; i < item.moves; i++) {
            switch(item.dir) {
                case 'U': acc.head.y--; break;
                case 'R': acc.head.x++; break;
                case 'D': acc.head.y++; break;
                case 'L': acc.head.x--; break;
            }

            for(let j = 0; j < acc.knots.length; j++) {
                const knot = acc.knots[j];
                const prevKnot = (j === 0) ? acc.head : acc.knots[j-1];
                const isTail = Boolean(j === acc.knots.length - 1);

                if(!isAdjacent(prevKnot, knot)) {
                    switch(true) {
                        case knot.x === prevKnot.x:
                            knot.y = (knot.y > prevKnot.y) ? knot.y-1 : knot.y+1;
                            break;
                        case knot.y === prevKnot.y:
                            knot.x = (knot.x > prevKnot.x) ? knot.x-1 : knot.x+1;
                            break;
                        default:
                            knot.x = (knot.x > prevKnot.x) ? knot.x-1 : knot.x+1;
                            knot.y = (knot.y > prevKnot.y) ? knot.y-1 : knot.y+1;
                            break;
                    }
                }

                if(isTail) {
                    acc.counter.add(`${knot.x}-${knot.y}`, true);
                }
            }
            
        }
        
        return acc;
    }, {
        counter: new Set(),
        head: {x: 0, y: 4},
        knots: Array.from('123456789').map(() => ({x: 0, y: 4})),
    })
    .counter.size

// > 2467

/////////////////////////////////////////////
// https://adventofcode.com/2022/day/10/input

$0.textContent.split('\n').filter(x => x !== '')
    .reduce((acc, cmd, index) => {
        if(cmd.startsWith('addx')) {
            const value = Number(cmd.split(' ')[1]);
            
            acc.cycleNum++;
            acc.cycles.push({cmd: 'addx (start cycle)', value, cycleNum: acc.cycleNum, duringCycleX: acc.X, afterCycleX: acc.X});
            
            acc.cycleNum++;
            const duringX = acc.X;
            acc.X += value;
            acc.cycles.push({cmd: 'addx (end cycle)', value, cycleNum: acc.cycleNum, duringCycleX: duringX, afterCycleX: acc.X});
        }
        else if(cmd === 'noop') {
            acc.cycleNum++;
            acc.cycles.push({cmd: 'noop', cycleNum: acc.cycleNum, duringCycleX: acc.X, afterCycleX: acc.X});
        }
        
        return acc;
    }, {
        cycleNum: 0,
        cycles: [],
        X: 1,
    })
    .cycles
    .filter(c => [20, 60, 100, 140, 180, 220].includes(c.cycleNum))
    .map(c => c.cycleNum * c.duringCycleX)
    .reduce((acc, v) => acc+v, 0)

// > 16880

/////////
// step2

$0.textContent.split('\n').filter(x => x !== '')
    .reduce((acc, cmd, index) => {
        if(cmd.startsWith('addx')) {
            const value = Number(cmd.split(' ')[1]);
            
            acc.cycleNum++;
            acc.cycles.push({cmd: 'addx (start cycle)', value, cycleNum: acc.cycleNum, duringCycleX: acc.X, afterCycleX: acc.X});
            
            acc.cycleNum++;
            const duringX = acc.X;
            acc.X += value;
            acc.cycles.push({cmd: 'addx (end cycle)', value, cycleNum: acc.cycleNum, duringCycleX: duringX, afterCycleX: acc.X});
        }
        else if(cmd === 'noop') {
            acc.cycleNum++;
            acc.cycles.push({cmd: 'noop', cycleNum: acc.cycleNum, duringCycleX: acc.X, afterCycleX: acc.X});
        }
        
        return acc;
    }, {
        cycleNum: 0,
        cycles: [],
        X: 1,
    })
    .cycles
    .reduce((acc, cycle, index) => {
        if(index === 0 || acc[acc.length-1].length === 40) {
            acc.push([]);
        }
        acc[acc.length-1].push(cycle);

        return acc;
    }, [])
    .map(cycles => {
        const line = cycles.map((cycle, index) => {
            const pixelPosition = index;
            const isSpriteActiveOnThisPixel = pixelPosition >= cycle.duringCycleX-1 && pixelPosition <= cycle.duringCycleX+1;
            
            return isSpriteActiveOnThisPixel ? '#' : '.';
        }).join('');

        console.log(line);
        return line;
    })

// > ###..#..#..##..####..##....##.###..###..
// > #..#.#.#..#..#....#.#..#....#.#..#.#..#.
// > #..#.##...#..#...#..#..#....#.###..#..#.
// > ###..#.#..####..#...####....#.#..#.###..
// > #.#..#.#..#..#.#....#..#.#..#.#..#.#.#..
// > #..#.#..#.#..#.####.#..#..##..###..#..#.

// > RKAZAJBR

/////////////////////////////////////////////
// https://adventofcode.com/2022/day/11/input

$0.textContent.split('\n\n').filter(x => x !== '')
    .map(x => x.split('\n').filter(x => x !== ''))
    .map(x => ({
        num: Number(x[0].substr(7, 1)),
        items: x[1].replace('  Starting items: ', '').split(', ').map(Number),
        operation: (input) => eval(x[2].replace('  Operation: new = ', '').replaceAll('old', input)),
        test: (input) => Boolean(input % Number(x[3].replace('  Test: divisible by ', '')) === 0),
        gotoIfTrue: Number(x[4].replace('    If true: throw to monkey ', '')),
        gotoIfFalse: Number(x[5].replace('    If false: throw to monkey ', '')),
        nbInspectedItems: 0,
    }))
    .reduce((acc, m) => {
        acc.monkeys.push(m);

        // All monkeys here, process rounds
        if(acc.monkeys.length === 8) {
            for(let i = 0; i < 20; i++) {
                acc.round++;
                
                acc.monkeys.forEach(monkey => {
                    while(monkey.items.length > 0) {
                        const itemValue = monkey.items.shift();
                        const itemNewValue = monkey.operation(itemValue);
                        const itemDividedValue = Math.floor(itemNewValue / 3);
                        const testResult = monkey.test(itemDividedValue);
                        const destinationMonkey = acc.monkeys[testResult ? monkey.gotoIfTrue : monkey.gotoIfFalse];
                        destinationMonkey.items.push(itemDividedValue);
                        monkey.nbInspectedItems++;
                    }
                });
            }
        }
        
        return acc;
    }, {
        monkeys: [], 
        round: 0
    })
    .monkeys
    .map(m => m.nbInspectedItems)
    .sort((a, b) => b-a)
    .filter((x, i) => i < 2)
    .reduce((acc, x) => acc*x, 1)

// > 56595

/////////
// step2 > Found solution online for LCM stuff, BigInt was bad idea !

$0.textContent.split('\n\n').filter(x => x !== '')
    .map(x => x.split('\n').filter(x => x !== ''))
    .map(x => ({
        num: Number(x[0].substr(7, 1)),
        items: x[1].replace('  Starting items: ', '').split(', ').map(Number),
        operation: (input) => eval(x[2].replace('  Operation: new = ', '').replaceAll('old', input)),
        divisibleBy: Number(x[3].replace('  Test: divisible by ', '')),
        gotoIfTrue: Number(x[4].replace('    If true: throw to monkey ', '')),
        gotoIfFalse: Number(x[5].replace('    If false: throw to monkey ', '')),
        nbInspectedItems: 0,
    }))
    .reduce((acc, m) => {
        acc.monkeys.push(m);

        // All monkeys here, process rounds
        if(acc.monkeys.length === 8) {
            const getLCM = (divisors) => {
                const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
                let lcm = 1;
                for (const divisor of divisors) {
                    lcm = (lcm * divisor) / gcd(lcm, divisor);
                }
                return lcm;
            };
            const lcm = getLCM(acc.monkeys.map(m => m.divisibleBy));
            
            for(let i = 0; i < 10_000; i++) {
                acc.round++;
                
                acc.monkeys.forEach(monkey => {
                    while(monkey.items.length > 0) {
                        const itemValue = monkey.items.shift();
                        const itemNewValue = monkey.operation(itemValue);
                        const worryLevel = itemNewValue % lcm;
                        const isDivisibleBy = worryLevel % monkey.divisibleBy === 0;
                        const destinationMonkey = acc.monkeys[isDivisibleBy ? monkey.gotoIfTrue : monkey.gotoIfFalse];
                        destinationMonkey.items.push(worryLevel);
                        monkey.nbInspectedItems++;
                    }
                });
            }
        }
        
        return acc;
    }, {
        monkeys: [], 
        round: 0
    })
    .monkeys
    .map(m => m.nbInspectedItems)
    .sort((a, b) => b-a)
    .filter((x, i) => i < 2)
    .reduce((acc, x) => acc*x, 1)

// > 15693274740

/////////////////////////////////////////////
// https://adventofcode.com/2022/day/12/input

//WIP

$0.textContent.split('\n').filter(x => x !== '')
    .map(line => line.split(''))
    .reduce((acc, line) => {
        acc.area.push(line);

        if(acc.area.length === 41) {
            const getValue = (x, y) => {
                if(x < 0 || x > 92 || y < 0 || y > 40) {
                    return 30;
                }
                const letter = acc.area[y][x];
                return 'abcdefghijklmnopqrstuvwxyz'.split('').findIndex(l => l === letter) + 1;
            };
            
            const getPathsFrom = (p, from) => {
                let paths = [];
                const up =    {x: p.x,   y: p.y-1, v: getValue(p.x, p.y-1), path: p.path+'U'};
                const down =  {x: p.x,   y: p.y+1, v: getValue(p.x, p.y+1), path: p.path+'D'};
                const left =  {x: p.x-1, y: p.y,   v: getValue(p.x-1, p.y), path: p.path+'L'};
                const right = {x: p.x+1, y: p.y,   v: getValue(p.x+1, p.y), path: p.path+'R'};

                // need check if inside area + not coming from position + value not more than +1
                [up, down, left, right].forEach(dir => {
                    if(!from || dir.x !== from.x || dir.y !== from.y) {
                        if(dir.v <= p.v + 1) {
                            paths = [...paths, ...getPathsFrom(dir, p)];
                        }
                    }
                });
                return paths;
            }

            acc.paths = getPathsFrom({x: 0, y: 0, v: 1}, null);
        }
        
        return acc;
    }, {area: [], paths: []})

/////////
// step2




/////////////////////////////////////////////
// https://adventofcode.com/2022/day/13/input

/////////
// step2

