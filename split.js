const fs = require('fs');

const prettier = require('prettier');
const fetch = require('node-fetch');
const { transform } = require('lebab');
const j = require('jscodeshift');

const version = 'v0.6.68.w';

if (fs.existsSync('./code')) {
  console.error('Please delete code folder!');
} else {
  fs.mkdirSync('./code');
  fetch(`https://www.majsoul.com/1/${version}/code.js`)
    .then(data => data.text())
    .then(text => {
      console.log('Fetched code.js');

      const formatted = prettier.format(text, {
        semi: true,
        arrowParens: 'avoid',
        singleQuote: true,
        tabWidth: 2,
        endOfLine: 'lf',
        parser: 'babel'
      });
      console.log('Formatted code.js');

      const majsoul_start = formatted.indexOf('var uiscript;');
      let majsoul_code = formatted.substr(majsoul_start);
      (() => {
        const laya_code = formatted.substr(0, majsoul_start);
        fs.writeFileSync('./code/laya.js', laya_code, { encoding: 'utf-8' });
        console.log('Saved laya.js');
      })();

      majsoul_code
        .split('\nvar')
        .map((code, index) => (index == 0 ? code : 'var' + code))
        .map((code, index) => {
          fs.mkdirSync(`./code/${index}/`);
          fs.writeFileSync(`./code/${index}/${index}_orig.js`, code, {
            encoding: 'utf-8'
          });
          return code;
        })
        .map(code => {
          const ast = j(code);

          let f;
          while (((f = ast.find(j.SequenceExpression)), f.length > 0)) {
            f.forEach((path, i) => {
              if (i > 0) return;
              const exps = path.value.expressions;
              const parent = (() => {
                let p = path.parent;
                while (
                  p.parent.node.type !== 'BlockStatement' &&
                  p.parent.node.type !== 'Program'
                ) {
                  p = p.parent;
                }
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
          return ast.toSource();
        })
        .map(
          code =>
            transform(code, [
              'arrow',
              'arrow-return',
              'for-of',
              'for-each',
              'arg-rest',
              'arg-spread',
              'obj-method',
              'obj-shorthand',
              'no-strict',
              'exponent',
              'multi-var',
              // 'let',
              'class',
              // 'commonjs',
              'template',
              'default-param',
              'destruct-param',
              'includes'
            ]).code
        )
        .forEach((code, index) => {
          fs.writeFileSync(`./code/${index}/${index}.js`, code, {
            encoding: 'utf-8'
          });
        });
    });
}
