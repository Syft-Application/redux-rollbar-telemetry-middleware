## Redux Rollbar Telemetry Middleware

Middleware that helps to add redux action to the [Rollbar.Telemetry](https://rollbar.com/docs/notifier/rollbar.js/#telemetry)

**Note:** `lib/` is in repo until we publish package on npm

### Usage

```
const middleware = rollbarTelemetryMiddleware(rollbar, options)
```

#### Options

| Name | Type | Default | Description |
| -    | -    | -       | -           |
| errorLogType | `string` | `warning` | Rollbar log type. "critical", "error", "warning", "info" or "debug" |
| defaultLogType | `string` | `debug` | Rollbar log type. "critical", "error", "warning", "info" or "debug" |
| pattern | `string`&#124;`array`&#124;`function`&#124;`RegExp` | accept all actions | Using pattern you can filter the action, that you want to log to the breadcrumbs |
| transformations | `Array[TransformationObject]` | - | Transformation will be applied to the action before the capture. It is useful if you want to omit some data from the actions |


##### TransformationObject

| Name | Type | Default | Description |
| -    | -    | -       | -           |
| pattern | `string`&#124;`array`&#124;`function`&#124;`RegExp` | - | Pattern to filter the action that we want to transform |
| transformation | `function` | - | Transformation function |

Transformation function receive the arguments:

* `action` - original action or the action from the previous transformation if this action matches to the several transformations

### Example

```
import { createStore, applyMiddleware } from 'redux'
import rollbarTelemetryMiddleware from 'lib/redux-rollbar-telemetry-middleware'

import Rollbar from 'rollbar' // server usage. for client use the instruction https://rollbar.com/docs/notifier/rollbar.js/#umd--browserify--requirejs--webpack

const rollbar = new Rollbar({ /* ... some config */ })

const middleware = [
  rollbarTelemetryMiddleware(rollbar)
];

export const store = createStore(
  appReducers,
  composeWithDevTools(
    applyMiddleware(...middleware),
  )
)

```
You can find more usecases in the [tests](./src/index.spec.js).


### License

MIT
