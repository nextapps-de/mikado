import { createRoot, createState, reconcile } from "solid-js";

// Explicit keyed reconciliation useful for immutable data stores or data snapshots
const App = () => {
  let itemId, itemIndex;
  const [state, setState] = createState({ data: [] });

  window._solid = items =>
    setState(reconcile("data", items.length ? items : []));

  return (
    <div>
      <For each={state.data}>
        {item => (
          (itemId = item.id),
          (itemIndex = item.index),
          (
            <section
              data-id={itemId}
              data-date={item.date}
              data-index={itemIndex}
            >
              <div class={item.classname} style="padding-right: 10px;">
                <div class="title" textContent={item.title} />
                <div class="content" textContent={item.content} />
                <div class="footer" textContent={item.footer} />
              </div>
            </section>
          )
        )}
      </For>
    </div>
  );
};

createRoot(() => root.appendChild(<App />));
