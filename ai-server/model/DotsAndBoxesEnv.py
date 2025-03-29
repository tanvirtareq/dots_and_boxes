from typing import Dict
import numpy as np
import gym
from gym import spaces

class DotsAndBoxesEnv(gym.Env):
    def __init__(self, grid_size=(5, 5)):  
        super(DotsAndBoxesEnv, self).__init__()

        self.grid_size = grid_size
        self.state = self.create_all_lines(grid_size)  # Dict[str, bool] -> key, isClicked -> key format: h-0-1
        self.done = False
        self.current_player = 1  # Player 1 starts

        # ✅ Action Space (total lines)
        self.action_space = spaces.Discrete(len(self.state))

        # ✅ Observation Space (binary representation of lines)
        self.observation_space = spaces.Box(low=0, high=1, shape=(len(self.state),), dtype=np.int8)

    def create_all_lines(self, size) -> Dict[str, bool]:
        lines = {}
        for i in range(size[0] + 1):  
            for j in range(size[1] + 1):
                if j < size[1]:
                    lines[f"v-{i}-{j}"] = False
                if i < size[0]:
                    lines[f"h-{i}-{j}"] = False
        return lines

    def step(self, action: int):
        if self.done:
            return self._get_observation(), 0, self.done, {}

        all_lines = sorted(self.state.keys())
        selected_line_key = all_lines[action]

        if self.state[selected_line_key]:  # Line already clicked
            return self._get_observation(), 0, self.done, {}

        self.state[selected_line_key] = True  # Mark line as clicked

        reward = self.evaluate_board(selected_line_key)
        self.done = self.check_game_over()

        # Switch player ONLY IF no box was completed
        if reward == 0:
            self.current_player = 1 if self.current_player == 2 else 2
            reward = -0.1

        return self._get_observation(), reward, self.done, {}

    def evaluate_board(self, last_move: str):
        """
        Check if the last move completed any box.
        Reward = +1 if at least one box was completed, else 0.
        """
        reward = 0
        parts = last_move.split("-")
        orientation, x, y = parts[0], int(parts[1]), int(parts[2])

        # Possible boxes affected by the last move
        affected_boxes = []

        if orientation == "h":  # Horizontal line
            if x > 0:  # Upper box
                affected_boxes.append((x - 1, y))
            if x < self.grid_size[0]:  # Lower box
                affected_boxes.append((x, y))
        elif orientation == "v":  # Vertical line
            if y > 0:  # Left box
                affected_boxes.append((x, y - 1))
            if y < self.grid_size[1]:  # Right box
                affected_boxes.append((x, y))

        # Check if any affected box is now completed
        for i, j in affected_boxes:
            if self.is_box_completed(i, j):
                reward = reward + 1  # A box was completed

        return reward

    def is_box_completed(self, i, j):
        """Check if a box at (i, j) is completed by verifying its four edges."""

        top = f"h-{i}-{j}"
        bottom = f"h-{i+1}-{j}"
        left = f"v-{i}-{j}"
        right = f"v-{i}-{j+1}"

        # Ensure all keys exist in self.state before accessing
        return (
            self.state.get(top, False) and
            self.state.get(bottom, False) and
            self.state.get(left, False) and
            self.state.get(right, False)
        )


    def check_game_over(self):
        return all(self.state.values())

    def reset(self):
        self.state = self.create_all_lines(self.grid_size)
        self.done = False
        self.current_player = 1  # Player 1 starts
        return self._get_observation()

    def _get_observation(self):
        return np.array(list(self.state.values()), dtype=np.int8)
