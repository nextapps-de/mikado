import { createRoot, createState, reconcile } from "solid-js";

// Non-keyed approach using reconciler
// Good for benchmarks not much else
const App = () => {
  const [state, setState] = createState({ data: [] });

  window._solid = items =>
    setState(
      reconcile(["data", items.length ? items : []], { merge: true, key: null })
    );

  return (
    <div>
      <For each={state.data}>
        {item => (
          <section
            data-id={item.id}
            data-date={item.date}
            data-index={item.index}
          >
            <div class={item.classname} style="padding-right: 10px;">
              <div class="title" textContent={item.title} />
              <div class="content" textContent={item.content} />
              <div class="footer" textContent={item.footer} />
            </div>
          </section>
        )}
      </For>
    </div>
  );
};

createRoot(() => root.appendChild(<App />));
