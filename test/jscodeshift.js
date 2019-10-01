const j = require('jscodeshift');

const ast = j(``);

let f;
while (((f = ast.find(j.SequenceExpression)), f.length > 0)) {
  f.forEach((path, i) => {
    if (i > 0) return;
    console.log('---');
    const exps = path.value.expressions;
    const parent = (() => {
      let p = path.parent;
      while (
        p.parent.node.type !== 'BlockStatement' &&
        p.parent.node.type !== 'Program'
      ) {
        p = p.parent;
      }
      console.log('!', p.node.type);
      return p;
    })();

    exps.forEach((e, index) => {
      try {
        if (index !== exps.length - 1) {
          j(parent).insertBefore(j.expressionStatement(e));
        } else {
          j(path).replaceWith(e);
        }
      } catch (err) {
        console.error(err);
      }
    });
  });
}

console.log(ast.toSource());
