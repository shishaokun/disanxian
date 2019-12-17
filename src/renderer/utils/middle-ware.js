/**
 * @file middleware
 */
export async function execSeries (promises, context) {
  for (let i = 0; i < promises.length; i++) {
    if (context._redirected) {
      return
    }
    await promisify(promises[i], context)
  }
}

export function promisify (fn, context) {
  let promise
  if (fn.length === 2) {
    // fn(context, callback)
    promise = new Promise((resolve, reject) => {
      fn(context, (err, data) => {
        if (err) {
        // 错误处理
          context.error(err)
          reject(err)
        } else {
          resolve(data)
        }
      })
    })
  } else {
    promise = fn(context)
    if (!promise || (!(promise instanceof Promise) && (typeof promise.then !== 'function'))) {
      promise = Promise.resolve(promise)
    }
  }
  return promise
}
let isInitialRoute = true

export function handleMiddlewares (appInfoObj, middlewareArr) {
  let {router, store} = appInfoObj
  console.log('router', router)
  router.beforeEach(async (to, from, next) => {
    console.log('to', to)
    if (!isInitialRoute && to.path === from.path) {
      return next()
    }
    isInitialRoute = false
    let unknowMiddleware = middlewareArr.find(middleware => typeof middleware !== 'function')
    if (unknowMiddleware) {
      throw new Error(`Unknown middleware ${unknowMiddleware}`)
    }
    // let nextCalled = false
    // const nextRedirect = opts => {
    //   if (nextCalled) {
    //     return
    //   }
    //   nextCalled = true
    //   next(opts)
    // }
    let contextInMiddleware = {
      router,
      store
    }
    // console.log(to, from)
    // try {
    await execSeries(middlewareArr, contextInMiddleware)
    // } catch (e) {
    // // console.log(e);
    //   if (to.path !== '/error') {
    //     return next({
    //       path: '/error',
    //       query: {
    //         message: e.message,
    //         showError: true
    //       }
    //     })
    //   }
    // }
    return next()
  })
}
