
/****************************************************
 *               MODIFY THIS FILE                   *
 *               ================                   *
 * This file is where you should specify the logic  *
 * specific to your extension.                      *
 ****************************************************/

import { init, stringTrigger } from './framework';

const opticDictionary =
{
  "<|": "cons",
  "|>": "snoc",
  "^..": "toListOf",
  "^?": "preview/head",
  "^?!": "UNSAFE preview/head",
  "^@..": "itoListOf",
  "^@?": "SAFE head (with index)",
  "^@?!": "UNSAFE head (with index)",
  "^.": "view",
  "^@.": "iview ",
  "<.": "a function composition (Indexed with non-indexed)",
  ".>": "a function composition (non-indexed with Indexed)",
  "<.>": "a composition of Indexed functions",
  "%%~": "modify target; extract functorial/applicative result",
  "%%=": "modify target in state; return extra information",
  "&~": "used to chain lens operations",
  "<&>": "a flipped version of <$>",
  "??": "used to flip argument order of composite functions",
  "<%~": "modify lens target; return result",
  "<+~": "increment lens target; return result",
  "<-~": "decrement lens target; return result",
  "<*~": "multiply lens target; return result",
  "<//~": "divide lens target; return result",
  "<^~": "raise lens target; return result",
  "<^^~": "raise lens target; return result",
  "<**~": "raise lens target; return result",
  "<||~": "logically-or lens target; return result",
  "<&&~": "logically-and lens target; return result",
  "<<%~": "modify lens target, return old value",
  "<<.~": "replace lens target, return old value",
  "<<?~": "replace lens target (with Just value), return old value",
  "<<+~": "increment lens target; return old value",
  "<<-~": "decrement lens target; return old value",
  "<<*~": "multiply lens target; return old value",
  "<<//~": "divide lens target; return old value",
  "<<^~": "raise lens target; return old value",
  "<<^^~": "raise lens target; return old value",
  "<<**~": "raise lens target; return old value",
  "<||~": "logically-or lens target; return old value",
  "<&&~": "logically-and lens target; return old value",
  "<<<>~": "modify lens target with (<>); return old value",
  "<%=": "modify target in state; return result",
  "<+=": "add to target in state; return result",
  "<-=": "subtract from target in state; return result",
  "<*=": "multiple the target in state; return result",
  "<//=": "divide the target in state; return result",
  "<^=": "raise lens target in state; return result",
  "<^^=": "raise lens target in state; return result",
  "<**=": "raise lens target in state; return result",
  "<||=": "logically-or lens target in state; return result",
  "<&&=": "logically-and lens target in state; return result",
  "<<%=": "modify lens target in state; return old value",
  "<<.=": "replace lens target in state; return old value",
  "<<?=": "replace target (with Just value) in state, return old value",
  "<<+=": "add to target in state; return old value",
  "<<-=": "subtract from target in state; return old value",
  "<<*=": "multiple the target in state; return old value",
  "<<//=": "divide the target in state; return old value",
  "<<^=": "raise lens target in state; return old value",
  "<<^^=": "raise lens target in state; return old value",
  "<<**=": "raise lens target in state; return old value",
  "<<||=": "logically-or lens target in state; return old value",
  "<<&&=": "logically-and lens target in state; return old value",
  "<<<>=": "modify target with (<>) in state; return old value",
  "<<~": "run monadic action, set lens target",
  "<<>~": "(<>) onto the end of lens target; return result",
  "<<>=": "(<>) onto the end of lens target in state; return result",
  "<%@~": "modify IndexedLens target; return intermediate result",
  "<<%@~": "modify IndexedLens target; return old value",
  "%%@~": "modify IndexedLens target; return supplementary result",
  "%%@=": "modify IndexedLens target in state; return supplementary result",
  "<%@=": "modify IndexedLens target in state; return intermediate result",
  "<<%@=": "modify IndexedLens target in state; return old value",
  "^#": "view (ALens version)",
  "#~": "set (ALens version)",
  "#%~": "over (ALens version)",
  "#%%~": "modify ALens target; extract functorial/applicative result",
  "%%=": "modify target in state; return extra information",
  "#=": "assign (ALens version)",
  "#%=": "map over ALens target(s) in state",
  "<#%~": "modify ALens target; return result",
  "<#%=": "modify ALens target in state; return result",
  "#%%=": "modify ALens target in state; return extra information",
  "<#~": "set with pass-through (ALens version)",
  "<#=": "set with pass-through in state (ALens version)",
  "%~": "over / modify target(s)",
  ".~": "set",
  "?~": "set to Just value",
  "<.~": "set with pass-through",
  "<?~": "set to Just value with pass-through",
  "+~": "increment target(s)",
  "*~": "multiply target(s)",
  "-~": "decrement target(s)",
  "//~": "divide target(s)",
  "^~": "raise target(s)",
  "^~": "raise target(s)",
  "^^~": "raise target(s)",
  "**~": "raise target(s)",
  "||~": "logically-or target(s)",
  "&&~": "logically-and target(s)",
  ".=": "assign in state",
  "%=": "map over target(s) in state",
  "?=": "set target(s) to Just value in state",
  "+=": "add to target(s) in state",
  "*=": "multiply target(s) in state",
  "-=": "decrement from target(s) in state",
  "//=": "divide target(s) in state",
  "^=": "raise target(s) in state",
  "^=": "raise target(s) in state",
  "^^=": "raise target(s) in state",
  "**=": "raise target(s) in state",
  "||=": "logically-or target(s) in state",
  "&&=": "logically-and target(s) in state",
  "<~": "run monadic action, set target(s) in state",
  "<.=": "set with pass-through in state",
  "<?=": "set Just value with pass-through in state",
  "<>~": "modify target with (<>)",
  "<>=": "modify target with (<>) in state",
  ".@~": "iset / set target(s) with index",
  ".@=": "set target(s) in state with index",
  "%@~": "iover / modify target(s) with index",
  "%@=": "modify target(s) in state with index",
  // don't think it worth to have these for now
  // "&": "a reverse application operator",
  // "#": "review",
}

const knownOperators = Object.keys(opticDictionary)

function matchingFn(node) {
  // ignore very big text nodes
  // (we are periodically iterating over the whole document)
  if (node.data.length > 1000) {
    return false
  } else {
    const operatorsInNode = knownOperators.filter(operator => node.data.includes(operator));

    // For now, the text nodes aren't split. 
    // For now, pick the longenst operator; e.g., prefer (^..) to (^.)
    if (operatorsInNode.length > 0) {
      operatorsInNode.sort((a, b) => b.length - a.length)
    }

    return operatorsInNode
  }
}

async function resolveFn(operator) {
  const matchingResult = opticDictionary[operator];
  const html = matchingResult
    ? `(${escapeHtml(operator)}) – ${escapeHtml(matchingResult)}`
    : `<i>unknown operator</i>`;
  await randomDelay(200, 2000);
  return html;
}

function escapeHtml(str) {
  var tagsToReplace = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;'
  }
  return str.replace(/[&<>]/g, x => tagsToReplace[x])
}

// to simulate network latency
async function randomDelay(minMs, maxMs) {
  const delay = minMs + Math.random() * (maxMs - minMs);
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, delay);
  });
}

// ========
// = MAIN =
// ========

console.log("Adding annotations to optic operators")

init({
  matchingFn: matchingFn,
  resolveFn: resolveFn,
  triggerConfig: stringTrigger(`🔍`),
  nestedCheck: true
})
