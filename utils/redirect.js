import Router from 'next/router'

export default (context, target) => {
  if (context.ctx.res) {
    // server
    // 303: "See other"
    context.ctx.res.writeHead(303, { Location: target })
    context.ctx.res.end()
  } else {
    // browser
    Router.replace(target)
  }
}
