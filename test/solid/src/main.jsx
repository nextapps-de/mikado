import { createRoot, createState } from "solid-js";

// Typical internal managed data usage
const App = () => {
  let itemId, itemIndex;
  const [state, setState] = createState({ data: [] });

  window._solid = items => setState("data", items.length ? items : []);

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
