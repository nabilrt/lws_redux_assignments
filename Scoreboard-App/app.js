const initialState = [{ id: 1, value: 0 }];

const ACTION_TYPES = {
  ADD_MATCH: "ADD_MATCH",
  DELETE_MATCH: "DELETE_MATCH",
  INCREASE_SCORE: "INCREASE_SCORE",
  DECREASE_SCORE: "DECREASE_SCORE",
  RESET_SCOREBOARD: "RESET_SCOREBOARD",
};

function scoreboardReducer(state = initialState, action) {
  switch (action.type) {
    case ACTION_TYPES.ADD_MATCH:
      return [...state, { id: state.length + 1, value: 0 }];

    case ACTION_TYPES.DELETE_MATCH:
      return state.filter((st) => st.id !== action.payload); // Corrected logic

    case ACTION_TYPES.RESET_SCOREBOARD:
      return state.map((st) => ({ ...st, value: 0 })); // Immutable update

    case ACTION_TYPES.INCREASE_SCORE:
      return state.map((st) =>
        st.id === action.payload.id
          ? { ...st, value: st.value + action.payload.value }
          : st
      );

    case ACTION_TYPES.DECREASE_SCORE:
      return state.map((st) =>
        st.id === action.payload.id
          ? { ...st, value: Math.max(0, st.value - action.payload.value) }
          : st
      );

    default:
      return state;
  }
}

const store = Redux.createStore(scoreboardReducer);
function createNewMatch(match) {
  return `
     <div class="match" data-id="${match.id}">
                <div class="wrapper">
                    <button class="lws-delete">
                        <img src="./image/delete.svg" alt="" />
                    </button>
                    <h3 class="lws-matchName">Match 1</h3>
                </div>
                <div class="inc-dec">
                    <form class="incrementForm">
                        <h4>Increment</h4>
                        <input type="number" name="increment" class="lws-increment" />
                    </form>
                    <form class="decrementForm">
                        <h4>Decrement</h4>
                        <input type="number" name="decrement" class="lws-decrement" />
                    </form>
                </div>
                <div class="numbers">
                    <h2 class="lws-singleResult">120</h2>
                </div>
            </div>
    `;
}

function render() {
  const state = store.getState();
  const matchesContainer = document.querySelector(".all-matches");
  matchesContainer.innerHTML = "";
  state.forEach((st) => {
    matchesContainer.innerHTML = createNewMatch(st);
  });

  document.querySelector(".lws-addMatch").addEventListener("click", () => {
    store.dispatch({ type: ACTION_TYPES.ADD_MATCH });
  });

  document.querySelector(".lws-reset").addEventListener("click", () => {
    store.dispatch({ type: ACTION_TYPES.RESET_SCOREBOARD });
  });

  document.querySelectorAll(".incrementForm").forEach((fr) => {
    fr.addEventListener("submit", (e) => {
      e.preventDefault();
      const matchId = Number(e.target.closest(".match").dataset.id);
      const value = Number(form.querySelector(".lws-increment").value);
      if (value)
        store.dispatch({
          type: ACTION_TYPES.INCREASE_SCORE,
          payload: {
            id: matchId,
            value,
          },
        });
    });
  });

  document.querySelectorAll(".decrementForm").forEach((fr) => {
    fr.addEventListener("submit", (e) => {
      e.preventDefault();
      const matchId = Number(e.target.closest(".match").dataset.id);
      const value = Number(form.querySelector(".lws-decrement").value);
      if (value)
        store.dispatch({
          type: ACTION_TYPES.DECREASE_SCORE,
          payload: {
            id: matchId,
            value,
          },
        });
    });
  });

  document.querySelectorAll(".lws-delete").forEach((button) => {
    button.addEventListener("click", (event) => {
      const matchId = Number(event.target.closest(".match").dataset.id);
      store.dispatch({
        type: ACTION_TYPES.DELETE_MATCH,
        payload: matchId,
      });
    });
  });
}

render();
store.subscribe(render);
render();
