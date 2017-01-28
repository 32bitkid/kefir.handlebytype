export default
  (receivers, passthrough = true) =>
  (emitter, e1, e2) => {
    const event = (e2 === undefined) ? e1 : e2;
    const { valueType, ...rest } = (e2 === undefined) ? e1.value : e1;
    for (let key in receivers) {
      if (!receivers.hasOwnProperty(key)) { continue; }
      if (key !== valueType) { continue; }
      receivers[key](emitter, rest, event);
      return;
    }
    if (passthrough) { emitter.event(event); }
  };

