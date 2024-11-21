const actions = [
  {
    id: "firefox",
    name: "Firefox",
    icon: "./src/web/assets/firefox.png",
  },
  {
    id: "steam",
    name: "Steam",
    icon: "./src/web/assets/steam.png",
  },
  {
    id: "xbox",
    name: "Xbox",
    icon: "./src/web/assets/xbox.png",
  },
  {
    id: "netflix",
    name: "Netflix",
    icon: "./src/web/assets/netflix.png",
  },
];

const html = `
  <div id="actions" class="actions"></div>
`;

document.addEventListener("DOMContentLoaded", () => {
  const actionsContainer = document.createElement("div");
  actionsContainer.innerHTML = html;
  document.body.appendChild(actionsContainer);

  const actionsElement = document.getElementById("actions");
  actions.forEach((action) => {
    const actionElement = document.createElement("div");
    actionElement.classList.add("action");
    actionElement.innerHTML = `<img src="${action.icon}"></img>`;
    actionsElement.appendChild(actionElement);
  });

  let selected = 0;
  let lastGamepadUpdate = 0;
  const GAMEPAD_THRESHOLD = 0.5;
  const GAMEPAD_REPEAT_DELAY = 250;

  const onChangeSelected = (newSelected) => {
    actions.forEach((_, index) => {
      const actionElement = actionsElement.children[index];
      if (index === newSelected) {
        actionElement.classList.add("action-selected");
      } else {
        actionElement.classList.remove("action-selected");
      }
    });
  };

  onChangeSelected(selected);

  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") {
      selected = Math.min(selected + 1, actions.length - 1);
      onChangeSelected(selected);
    } else if (event.key === "ArrowLeft") {
      selected = Math.max(selected - 1, 0);
      onChangeSelected(selected);
    }
  });

  const handleGamepad = () => {
    const gamepad = navigator.getGamepads()[0];
    if (!gamepad) return;

    const now = Date.now();
    if (now - lastGamepadUpdate < GAMEPAD_REPEAT_DELAY) return;

    let shouldUpdate = false;
    let direction = 0;

    if (gamepad.buttons[14].pressed) {
      direction = -1;
      shouldUpdate = true;
    } else if (gamepad.buttons[15].pressed) {
      direction = 1;
      shouldUpdate = true;
    }

    if (Math.abs(gamepad.axes[0]) > GAMEPAD_THRESHOLD) {
      direction = gamepad.axes[0] > 0 ? 1 : -1;
      shouldUpdate = true;
    }

    if (shouldUpdate) {
      const newSelected = Math.max(
        0,
        Math.min(selected + direction, actions.length - 1)
      );
      if (newSelected !== selected) {
        selected = newSelected;
        onChangeSelected(selected);
        lastGamepadUpdate = now;
      }
    }
  };

  const pollGamepad = () => {
    handleGamepad();
    requestAnimationFrame(pollGamepad);
  };

  window.addEventListener("gamepadconnected", (e) => {
    console.log("Gamepad connected:", e.gamepad.id);
    pollGamepad();
  });

  actionsElement.addEventListener("mouseover", (event) => {
    const actionElement = event.target.closest(".action");
    if (actionElement) {
      selected = Array.from(actionsElement.children).indexOf(actionElement);
      onChangeSelected(selected);
    }
  });
});
