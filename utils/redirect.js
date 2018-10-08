import Router from 'next/router'

export default (context, target) => {
  const res = context.res || context.ctx && context.ctx.res;
  if (res) {
    // server
    // 303: "See other"
    res.writeHead(303, { Location: target })
    res.end()
  } else {
    // browser
    Router.replace(target)
  }
}
