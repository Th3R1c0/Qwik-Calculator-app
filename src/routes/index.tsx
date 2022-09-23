import {
  component$,
  useStore,
  useContext,
  useContextProvider,
  createContext,
  useStyles$,
} from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { Link } from '@builder.io/qwik-city';

export const MyContext = createContext('contextgfds');

export const KeyPad = component$(() => {
  const store = useContext(MyContext);
  useStyles$(AppStyles);

  return (
    <div class="keypad">
      <div class="keypad_numbers">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((btn) => (
          <div
            class="pad_numbers"
            onClick$={() => (store.equation = store.equation + `${btn}`)}
          >
            {btn}
          </div>
        ))}
      </div>
      <div class="keypad_operations">
        {['+', '-', '*', '/', '='].map((btn, index) => (
          <div
            class="pad_operations"
            onClick$={() =>
              btn == '='
                ? (store.equation = eval(store.equation))
                : (store.equation = store.equation + `${btn}`)
            }
          >
            <p>{btn}</p>
          </div>
        ))}
      </div>
    </div>
  );
});

export const Screen = component$(() => {
  useStyles$(AppStyles);
  const store = useContext(MyContext);
  return (
    <div class="screen">
      <div class="screen_equation">
        <p>{store.equation}</p>
      </div>
      <button class="screen_clear" onClick$={() => (store.equation = '')}>
        <p> clear </p>
      </button>
    </div>
  );
});

export default component$(() => {
  const store = useStore({
    equation: '1',
  });
  useContextProvider(MyContext, store);
  return (
    <div>
      <h1> Calculator app </h1>
      <Screen />
      <KeyPad />
    </div>
  );
});

export const AppStyles = `
  .keypad {
    display: flex;
    width: 100%;
    height: 100%;
  }
  .pad_numbers {
    border: 2px solid black;
    width: 30%;
    padding: 10px;
    flex-grow:1;
  }
  .keypad_operations {
    flex-grow: 1;
    display:flex;
    flex-direction: column
  }
  .pad_operations {
    border: 2px solid black;
    width: 100%;
    padding: 10px;
    flex-grow:1;
  }
  .keypad_numbers {
    flex-grow: 2;
    height: 100%;
    display: flex;
    flex-direction: row;
    background-color: red;
    align-content: stretch;
    flex-wrap: wrap;
  }
  .screen {
    height: 100px;
    background-color: blue;
    padding: 10px;
    display:flex;
    align-items:center;
    font-size: 100px;
  }
  .screen_clear {
    flex-grow: 1
    width: 20%;
  }
  .screen_equation {
    width: 80%;
    flex-grow: 1
  }
`;
