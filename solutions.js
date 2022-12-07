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

/////////////////////////////////////////////
// https://adventofcode.com/2022/day/8/input

/////////
// step2

/////////////////////////////////////////////
// https://adventofcode.com/2022/day/9/input

/////////
// step2

/////////////////////////////////////////////
// https://adventofcode.com/2022/day/10/input

/////////
// step2




