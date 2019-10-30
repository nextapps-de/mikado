import { createRoot, createState } from 'solid-js';

const App = () => {
  const [ state, setState ] = createState({ data: [] });

  window._solid = (items) => setState({ data: items.length ? items : [] });

  return <div>
      <For each={( state.data )}>{ item =>
        <section model={ item.id } data-id={item.id} data-date={item.date} data-index={item.index}>
          <div class={item.classname} style="padding-right: 10px;">
            <div class="title" textContent={item.title} />
            <div class="content" textContent={item.content} />
            <div class="footer" textContent={item.footer} />
          </div>
        </section>
      }</For>
    </div>
}

createRoot(() => root.appendChild(<App />))
