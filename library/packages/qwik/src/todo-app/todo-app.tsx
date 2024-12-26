import {
  $,
  Fragment,
  component$,
  h,
  useStore,
  useStylesScoped$,
} from "@builder.io/qwik";

export const addItem = function addItem(props, state) {
  if (!state.newItemName) {
    return;
  }
  state.list = [...state.list, state.newItemName];
};
export const deleteItem = function deleteItem(props, state, idx: number) {
  state.list = state.list.filter((x, i) => i !== idx);
};
export const TodoApp = component$((props: any) => {
  useStylesScoped$(STYLES);

  const state = useStore<any>({ list: ["hello", "world"], newItemName: "" });

  return (
    <div class="div-TodoApp">
      <span>TO-DO list:</span>
      <div class="div-TodoApp-2">
        <input
          placeholder="Add a new item"
          class="input-TodoApp"
          value={state.newItemName}
          onChange$={$((event) => (state.newItemName = event.target.value))}
        />
        <button
          class="button-TodoApp"
          onClick$={$((event) => addItem(props, state))}
        >
          Add
        </button>
      </div>
      <div class="div-TodoApp-3">
        <ul class="ul-TodoApp">
          {(state.list || []).map((item, idx) => {
            return (
              <li class="li-TodoApp" key={idx}>
                <span>{item}</span>
                <button
                  class="button-TodoApp-2"
                  onClick$={$((event) => {
                    deleteItem(props, state, idx);
                  })}
                >
                  Delete
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
});

export default TodoApp;

export const STYLES = `
.div-TodoApp {
  padding: 10px;
  max-width: 700px;
}
.div-TodoApp-2 {
  display: flex;
  width: 100%;
  gap: 16px;
  align-items: stretch;
}
.input-TodoApp {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  border-radius: 0.25rem;
  flex-grow: 1;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
.button-TodoApp {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  border-radius: 0.25rem;
  font-weight: 700;
  color: #ffffff;
  background-color: #3b82f6;
  cursor: pointer;
}
.div-TodoApp-3 {
  margin-top: 1rem;
}
.ul-TodoApp {
  border-radius: 0.25rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  margin: unset;
  padding: unset;
}
.li-TodoApp {
  display: flex;
  padding: 0.625rem;
  align-items: center;
  border-bottom-width: 1px;
  border-color: #e5e7eb;
  gap: 16px;
}
.button-TodoApp-2 {
  cursor: pointer;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  border-radius: 0.25rem;
  color: #ffffff;
  background-color: #ef4444;
}
`;
