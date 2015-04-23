import {Pos} from "../model"
import {defineOption} from "../edit"
import {Rule, addInputRules, removeInputRules} from "./inputrules"

defineOption("autoInput", false, function(pm, val, old) {
  if (val && !old) addInputRules(pm, rules)
  else if (!val && old) removeInputRules(pm, rules)
})

export var rules = [
  new Rule("-", /--$/, "—"),
  new Rule('"', /\s(")$/, "“"),
  new Rule('"', /"$/, "”"),
  new Rule("'", /\s(')$/, "‘"),
  new Rule("'", /'$/, "’"),

  new Rule(" ", /^\s*> $/, function(pm, _, pos) {
    wrapAndJoin(pm, pos, "blockquote")
  }),
  new Rule(" ", /^(\d+)\. $/, function(pm, match, pos) {
    let order = +match[1]
    wrapAndJoin(pm, pos, "ordered_list", {order: order || null, tight: true},
                node => node.content.length + (node.attrs.order || 1) == order)
  }),
  new Rule(" ", /^\s*([-+*]) $/, function(pm, match, pos) {
    let bullet = match[1]
    wrapAndJoin(pm, pos, "bullet_list", {bullet: bullet, tight: true},
                node => node.attrs.bullet == bullet)
  }),
  new Rule("`", /^```$/, function(pm, _, pos) {
    setAs(pm, pos, "code_block", {params: ""})
  }),
  new Rule(" ", /^(#{1,6}) $/, function(pm, match, pos) {
    setAs(pm, pos, "heading", {level: match[1].length})
  })
]

function wrapAndJoin(pm, pos, type, attrs = null, predicate = null) {
  let parentOffset = pos.path[pos.path.length - 1]
  let sibling = parentOffset > 0 && pm.doc.path(pos.shorten()).content[parentOffset - 1]
  let join = sibling.type.name == type && (!predicate || predicate(sibling))
  let tr = pm.tr.wrap(pos, pos, new Node(type, attrs))
  let delPos = tr.mapSimple(pos)
  tr.delete(new Pos(delPos.path, 0), delPos)
  if (join) tr.join(tr.mapSimple(pos, -1))
  pm.apply(tr)
}

function setAs(pm, pos, type, attrs) {
  pm.apply(pm.tr.setType(pos, pos, new Node(type, attrs))
                .delete(new Pos(pos.path, 0), pos))
}
