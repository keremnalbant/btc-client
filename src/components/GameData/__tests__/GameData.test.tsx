import { render, screen, waitFor } from '@testing-library/react';
import GameData from '..';
import { Game } from '../../../models';
import * as gameService from '../../../services/gameService';
import { formatPrice } from '../../../utils/formatPrice';

const getGameDataMock = jest.spyOn(gameService, 'getGame');
const gameData: Game = {
  id: 'abc-123-ccc-xxx',
  value: 35000,
  difference: 0.05538989,
};

describe('GameData', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should render correctly', async () => {
    render(<GameData />);
  });

  it('displays loader when game data is not available, and calls get game data function', async () => {
    render(<GameData />);
    expect(getGameDataMock).toHaveBeenCalled();
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('displays game data when available', async () => {
    getGameDataMock.mockResolvedValue(gameData);
    render(<GameData />);
    await waitFor(() => {
      expect(screen.getByText(formatPrice(gameData.value))).toBeInTheDocument();
    });
    expect(
      screen.getByText(`${gameData.difference.toFixed(4)}%`),
    ).toBeInTheDocument();
  });

  it('applies correct styles based on difference value', async () => {
    getGameDataMock.mockResolvedValue(gameData);
    render(<GameData />);
    await waitFor(() => {
      expect(
        screen.getByText(`${gameData.difference.toFixed(4)}%`),
      ).toBeInTheDocument();
    });
    expect(screen.getByTestId('difference-container')).toHaveClass(
      gameData.difference >= 0
        ? 'bg-green-400 text-green-600'
        : 'bg-red-400 text-red-600',
    );
  });
});
