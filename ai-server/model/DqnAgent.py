import collections
from .Dqn import DQN
import torch.optim as optim
import random
import torch
import numpy as np
import torch.nn as nn

class DQNAgent:
    def __init__(self, env, lr=0.001, gamma=0.99, epsilon=1.0, epsilon_min=0.1, epsilon_decay=0.999, batch_size=32, memory_size=10000):
        self.env = env
        self.gamma = gamma
        self.epsilon = epsilon
        self.epsilon_min = epsilon_min
        self.epsilon_decay = epsilon_decay
        self.batch_size = batch_size

        self.memory = collections.deque(maxlen=memory_size)  # Experience Replay Buffer

        self.model = DQN(input_dim=env.observation_space.shape[0], output_dim=env.action_space.n)
        self.optimizer = optim.Adam(self.model.parameters(), lr=lr)
        self.loss_fn = nn.MSELoss()

    def get_action(self, state):
        if random.random() < self.epsilon:
            return self.env.action_space.sample()  # Explore
        state = torch.tensor(state, dtype=torch.float32).unsqueeze(0)  # Add batch dimension
        with torch.no_grad():
            q_values = self.model(state)
        return torch.argmax(q_values).item()  # Exploit

    def store_experience(self, state, action, reward, next_state, done):
        self.memory.append((state, action, reward, next_state, done))

    def train_step(self):
        if len(self.memory) < self.batch_size:
            return  # Skip training if not enough samples

        batch = random.sample(self.memory, self.batch_size)
        states, actions, rewards, next_states, dones = zip(*batch)

        states = torch.tensor(np.array(states), dtype=torch.float32)
        actions = torch.tensor(actions, dtype=torch.int64).unsqueeze(1)
        rewards = torch.tensor(rewards, dtype=torch.float32)
        next_states = torch.tensor(np.array(next_states), dtype=torch.float32)
        dones = torch.tensor(dones, dtype=torch.float32)

        # Compute Q-values
        q_values = self.model(states).gather(1, actions).squeeze()

        # Compute target Q-values
        with torch.no_grad():
            next_q_values = self.model(next_states).max(1)[0]
            target_q_values = rewards + (1 - dones) * self.gamma * next_q_values

        # Compute loss
        loss = self.loss_fn(q_values, target_q_values)

        # Backpropagation
        self.optimizer.zero_grad()
        loss.backward()
        self.optimizer.step()

    def train(self, num_episodes=1000):
        for episode in range(num_episodes):
            state = self.env.reset()
            total_reward = 0
            done = False
            while not done:
                # If it's AI's turn (Player 1)
                if self.env.current_player == 1:
                    action = self.get_action(state)  # AI chooses action
                    next_state, reward, done, _ = self.env.step(action)  # Take action
                    self.store_experience(state, action, reward, next_state, done)
                    self.train_step()  # Update model
                    state = next_state
                    total_reward += reward

                # If it's opponent's turn (Player 2)
                elif self.env.current_player == 2:
                    # Here, the opponent plays randomly
                    action = self.env.action_space.sample()  # Opponent chooses random action
                    next_state, reward, done, _ = self.env.step(action)  # Take action
                    state = next_state
                    total_reward -= reward

            # Decay epsilon for exploration-exploitation trade-off
            self.epsilon = max(self.epsilon_min, self.epsilon * self.epsilon_decay)

            print(f"Episode {episode + 1}: Total Reward = {total_reward}")
    
    def get_sorted_actions_with_scores(self, state):
        state_tensor = torch.tensor(state, dtype=torch.float32).unsqueeze(0)  # Add batch dimension
        with torch.no_grad():
            q_values = self.model(state_tensor).squeeze().numpy()  # Get Q-values for each action

        # Create a list of (action, q_value) pairs
        actions_with_scores = [(i, q_value) for i, q_value in enumerate(q_values)]

        # Sort the actions based on their Q-values in descending order (better actions first)
        sorted_actions = sorted(actions_with_scores, key=lambda x: x[1], reverse=True)

        return sorted_actions
