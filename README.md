# kefir.handlebytype

A tiny helper to facilitate event replication over Kefir.Observable Flux-like event streams. Works best when paired with [`kefir.handle`](https://github.com/32bitkid/kefir.handle).

## Installation

### NPM

```
npm install kefir.handlebytype
```

## Usage

Each of handler is invoked with three arguments: an emitter, the value of the event (_without_ the `type` property), and an event object.

```js
import Kefir from 'kefir';
import handle from 'kefir.handle';
import handleByType from 'kefir.handlebytype';

var source = Kefir.sequentally(100, [
  { type: 'FOO', foo: 'hello' },
  { type: 'BAR', bar: 'world' },
]);

source.withHandler(handle({
  value: handleByType({
    FOO(emitter, data) {
      emitter.value({ type: 'BAZ', data: data.foo });
    },
    BAR(emitter, data) {
      emitter.value({ type: 'BAZ', data: data.bar });
    }
  }),
}));
```

A second argument, `options`, can be passed to further control the handler. A options value of `{ only: true }` will throw away types that are _not_ matched by any handler.


```js
source.withHandler(handle({
  value: handleByType({
    FOO(emitter, data, event) { emitter.event(event); },
  }),
}, { only: true }));

// Only FOO events will be re-emitted.
```



