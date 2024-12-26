import {
  $,
  Fragment,
  component$,
  h,
  useStore,
  useStylesScoped$,
  useTask$,
} from "@builder.io/qwik";

export type Props = {
  getValues?: (input: string) => Promise<any[]>;
  renderChild?: any;
  transformData?: (item) => string;
};
export const setInputValue = function setInputValue(
  props,
  state,
  value: string
) {
  state.inputVal = value;
};
export const handleClick = function handleClick(props, state, item) {
  setInputValue(props, state, transform(props, state, item));
  state.showSuggestions = false;
};
export const fetchVals = function fetchVals(props, state, city: string) {
  if (props.getValues) {
    return props.getValues(city);
  }
  return fetch(
    `http://universities.hipolabs.com/search?name=${city}&country=united+states`
  ).then((x) => x.json());
};
export const transform = function transform(props, state, x) {
  return props.transformData ? props.transformData(x) : x.name;
};
export const AutoComplete = component$((props: Props) => {
  useStylesScoped$(STYLES);

  const state = useStore<any>({
    inputVal: "",
    showSuggestions: false,
    suggestions: [],
  });
  useTask$(({ track }) => {
    track(() => state.inputVal);
    track(() => props.getValues);
    fetchVals(props, state, state.inputVal).then((newVals) => {
      if (!newVals?.filter) {
        console.error("Invalid response from getValues:", newVals);
        return;
      }
      state.suggestions = newVals.filter((data) =>
        transform(props, state, data)
          .toLowerCase()
          .includes(state.inputVal.toLowerCase())
      );
    });
  });

  return (
    <div class="div-AutoComplete">
      Autocomplete:
      <div class="div-AutoComplete-2">
        <input
          placeholder="Search for a U.S. university"
          class="input-AutoComplete"
          value={state.inputVal}
          onChange$={$((event) => (state.inputVal = event.target.value))}
          onFocus$={$((event) => (state.showSuggestions = true))}
        />
        <button
          class="button-AutoComplete"
          onClick$={$((event) => {
            state.inputVal = "";
            state.showSuggestions = false;
          })}
        >
          X
        </button>
      </div>
      {state.suggestions.length > 0 && state.showSuggestions ? (
        <ul class="ul-AutoComplete">
          {(state.suggestions || []).map((item, idx) => {
            return (
              <li
                class="li-AutoComplete"
                key={idx}
                onClick$={$((event) => handleClick(props, state, item))}
              >
                {props.renderChild ? (
                  <props.renderChild item={item}></props.renderChild>
                ) : (
                  <span>{transform(props, state, item)}</span>
                )}
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
});

export default AutoComplete;

export const STYLES = `
.div-AutoComplete {
  padding: 10px;
  max-width: 700px;
}
.div-AutoComplete-2 {
  position: relative;
  display: flex;
  gap: 16px;
  align-items: stretch;
}
.input-AutoComplete {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  border-radius: 0.25rem;
  border-width: 1px;
  border-color: #000000;
  width: 100%;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
.button-AutoComplete {
  cursor: pointer;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  border-radius: 0.25rem;
  color: #ffffff;
  background-color: #ef4444;
}
.ul-AutoComplete {
  border-radius: 0.25rem;
  height: 10rem;
  margin: unset;
  padding: unset;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
.li-AutoComplete {
  display: flex;
  padding: 0.5rem;
  align-items: center;
  border-bottom-width: 1px;
  border-color: #e5e7eb;
  cursor: pointer;
}
.li-AutoComplete:hover {
  background-color: #f3f4f6;
}
`;
