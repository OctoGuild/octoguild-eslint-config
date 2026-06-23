const legacyContextMethods = {
  getSourceCode: (context) => () => context.sourceCode,
  getFilename: (context) => () => context.filename,
  getPhysicalFilename: (context) => () => context.physicalFilename,
  getCwd: (context) => () => context.cwd,
}

export function patchLegacyContext(context) {
  return new Proxy(context, {
    get(target, prop, receiver) {
      if (prop in legacyContextMethods) {
        return legacyContextMethods[prop](target)
      }

      return Reflect.get(target, prop, receiver)
    },
  })
}

export function patchLegacyPluginRules(plugin) {
  if (!plugin?.rules) {
    return plugin
  }

  const rules = Object.fromEntries(
    Object.entries(plugin.rules).map(([name, rule]) => [name, patchRule(rule)]),
  )

  return { ...plugin, rules }
}

function patchRule(rule) {
  const create = typeof rule === 'function' ? rule : rule.create

  const patchedCreate = (context) => create(patchLegacyContext(context))

  if (typeof rule === 'function') {
    return { meta: { schema: false }, create: patchedCreate }
  }

  return {
    ...rule,
    meta: { ...rule.meta, schema: rule.meta?.schema ?? false },
    create: patchedCreate,
  }
}
